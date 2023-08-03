import { Col, Descriptions, Modal, Row, Select, Tag } from "antd";
import React, { useEffect, useState } from "react";
import {
  AssignButton,
  AssignTitle,
  CustomModalSelect,
  ErrorMessage,
  FormItem,
  InputFelidModel,
  LabelModal,
  ModalSelectWrapper,
  TagContainer,
} from "../style";
import { assignTrainer, getTrainers } from "../../../actions/AuthActions";
import { getWorkouts } from "../../../actions/WorkoutAction";
import { getAvailableEquipment } from "../../../actions/EquipmentAction";
import { addWorkoutEvents } from "../../../actions/WorkoutEventAction";
import { userRoles } from "../../../resources/UserRoles";
import { assignExerciseSchema } from "../../utils/validations";

const MemberModal = ({ isModalOpen, onOk, member, trainerMode }) => {
  const [instructors, setInstructors] = useState([]);
  const [workouts, setWorkouts] = useState([]);
  const [equipments, setEquipments] = useState([]);
  const [errors, setErrors] = useState({});
  const [validationMode, setValidationMode] = useState(false);
  const [inputValue, setInputValue] = useState(null);

  const [inputs, setInputs] = useState({
    memberId: "",
    trainerId: JSON.parse(sessionStorage.getItem("user")),
    workoutId: [],
    // equipmentId: "",
    numberOfSessions: "",
    description: "",
  });

  const clearInputs = () => {
    setInputs({
      memberId: "",
      trainerId: JSON.parse(sessionStorage.getItem("user")),
      workoutId: [],
      // equipmentId: "",
      numberOfSessions: "",
      description: "",
    });
  };
  const user = JSON.parse(sessionStorage.getItem("profile"));

  const fetchData = async () => {
    setInstructors(await getTrainers());
    setWorkouts(await getWorkouts());
    setEquipments(await getAvailableEquipment());
  };
  const handleAssign = async () => {
    const res = await assignTrainer(member?.userID, inputValue);
    if (res) {
      setInputValue(null);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const handleOnChange = (event) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  };

  const handleWorkOutEventAssign = () => {
    setValidationMode(true);
    console.log(inputs);
    assignExerciseSchema
      .validate(inputs, { abortEarly: false })
      .then(async () => {
        const res = await addWorkoutEvents(member?.userID, inputs);
        if (res) {
          clearInputs();
          onOk();
          setValidationMode(false);
        }
      })
      .catch((validationErrors) => {
        const newErrors = {};
        validationErrors.inner.forEach((error) => {
          newErrors[error.path] = error.message;
        });
        setErrors(newErrors);
      });
  };

  useEffect(() => {
    if (validationMode) {
      assignExerciseSchema
        .validate(inputs, { abortEarly: false })
        .then(() => {
          setErrors(null);
        })
        .catch((validationErrors) => {
          const newErrors = {};
          validationErrors.inner.forEach((error) => {
            newErrors[error.path] = error.message;
          });
          setErrors(newErrors);
        });
    }
  }, [inputs, validationMode]);

  const handleClose = (id) => {
    console.log(id);
    const filterItem = inputs.workoutId.filter((item) => item.id !== id);
    console.log(filterItem);

    setInputs({ ...inputs, workoutId: filterItem });
  };
  return (
    <Modal
      title="Member Details"
      cancelButtonProps={{ style: { display: "none" } }}
      open={isModalOpen}
      onOk={() => {
        onOk();
        clearInputs();
      }}
      width={800}
      onCancel={() => {
        onOk();
        clearInputs();
      }}
    >
      <Descriptions title={member?.fullName}>
        <Descriptions.Item label="UserID">{member?.userID}</Descriptions.Item>
        <Descriptions.Item label="Email">{member?.email}</Descriptions.Item>
        <Descriptions.Item label="NIC">{member?.nic}</Descriptions.Item>
        <Descriptions.Item label="UserRole">
          {member?.userRole}
        </Descriptions.Item>
        <Descriptions.Item label="Gender">
          {member?.gender ? member?.gender : "--"}
        </Descriptions.Item>
        <Descriptions.Item label="Mobile">
          {member?.mobile ? member?.mobile : "--"}
        </Descriptions.Item>
        <Descriptions.Item label="Trainer">
          {member?.instructor ? member?.instructor?.fullName : "--"}
        </Descriptions.Item>
        <Descriptions.Item label="Weight">
          {member?.weight ? member?.weight : "--"}
        </Descriptions.Item>
        <Descriptions.Item label="Height">
          {member?.height ? member?.height : "--"}
        </Descriptions.Item>
        <Descriptions.Item label="Birthday">
          {member?.dob ? new Date(member?.dob).toDateString() : "--"}
        </Descriptions.Item>
        <Descriptions.Item label="City">
          {member?.city ? member?.city : "--"}
        </Descriptions.Item>
        <Descriptions.Item label="Branch">
          {member?.branch ? member?.branch : "--"}
        </Descriptions.Item>
        <Descriptions.Item label="Purpose">
          {member?.purpose ? member?.purpose : "--"}
        </Descriptions.Item>
        <Descriptions.Item label="Personal Info">
          {member?.personalInfo ? member?.personalInfo : "--"}
        </Descriptions.Item>
      </Descriptions>
      {trainerMode ? (
        <>
          <Row>
            <AssignTitle>Assign Exercise</AssignTitle>
          </Row>
          <Row gutter={16}>
            <Col xs={24} sm={24} md={12}>
              <FormItem>
                <LabelModal>Exercise</LabelModal>
                <CustomModalSelect
                  style={{ width: "100%" }}
                  placeholder="Select Workout"
                  // value={inputs.workoutId}
                  onChange={(value) => {
                    console.log(value);
                    const filterItem = workouts.find(
                      (item) => item.id === value
                    );
                    const newWorkouts = [...inputs.workoutId, filterItem];
                    setInputs({ ...inputs, workoutId: newWorkouts });
                  }}
                >
                  {workouts?.map((item) => (
                    <Select.Option key={item.id} value={item.id}>
                      {item.title}
                    </Select.Option>
                  ))}
                </CustomModalSelect>
                <TagContainer>
                  {inputs.workoutId?.length > 0 &&
                    inputs.workoutId?.map((item) => (
                      <Tag
                        color="success"
                        closable
                        style={{ width: "fit-content" }}
                        onClose={() => handleClose(item.id)}
                      >
                        {item.title}
                      </Tag>
                    ))}
                </TagContainer>
                {errors?.workoutId && (
                  <ErrorMessage>{errors?.workoutId}</ErrorMessage>
                )}
              </FormItem>
            </Col>
            {/* <Col xs={24} sm={24} md={12}>
              <FormItem>
                <LabelModal>Equipment</LabelModal>
                <CustomModalSelect
                  style={{ width: "100%" }}
                  placeholder="Select Equipment"
                  value={inputs.equipmentId}
                  onChange={(value) => {
                    setInputs({ ...inputs, equipmentId: value });
                  }}
                >
                  {equipments?.map((item) => (
                    <Select.Option key={item.id} value={item.id}>
                      {item.name}
                    </Select.Option>
                  ))}
                </CustomModalSelect>
                {errors?.equipmentId && (
                  <ErrorMessage>{errors?.equipmentId}</ErrorMessage>
                )}
              </FormItem>
            </Col> */}
            <Col xs={24} sm={24} md={12}>
              <FormItem>
                <LabelModal>Number Of Sessions</LabelModal>
                <InputFelidModel
                  type="number"
                  name="numberOfSessions"
                  onChange={handleOnChange}
                  value={inputs.numberOfSessions}
                />
                {errors?.numberOfSessions && (
                  <ErrorMessage>{errors?.numberOfSessions}</ErrorMessage>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} sm={24} md={12}>
              <FormItem>
                <LabelModal>Description</LabelModal>
                <InputFelidModel
                  name="description"
                  onChange={handleOnChange}
                  value={inputs.description}
                />
                {errors?.description && (
                  <ErrorMessage>{errors?.description}</ErrorMessage>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row justify={"end"}>
            <AssignButton
              onClick={handleWorkOutEventAssign}
              style={{ marginTop: "10px" }}
            >
              Assign
            </AssignButton>
          </Row>
        </>
      ) : (
        userRoles.ADMIN === user.userRole && (
          <ModalSelectWrapper>
            <CustomModalSelect
              placeholder="Assign Trainer"
              value={inputValue}
              onChange={(value) => {
                setInputValue(value);
              }}
            >
              {instructors?.map((item) => (
                <Select.Option key={item.userID} value={item.userID}>
                  {item.fullName}
                </Select.Option>
              ))}
            </CustomModalSelect>
            <AssignButton disabled={!inputValue} onClick={handleAssign}>
              Assign
            </AssignButton>
          </ModalSelectWrapper>
        )
      )}
    </Modal>
  );
};

export default MemberModal;
