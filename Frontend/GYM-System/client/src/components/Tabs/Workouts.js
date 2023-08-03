import React, { useEffect, useState } from "react";
import {
  AddButton,
  ButtonContainer,
  Container,
  CreateButton,
  CustomSelect,
  CustomTable,
  ErrorMessage,
  FormContainer,
  IconWrapper,
} from "./style";
import { DeleteFilled, EditOutlined, EyeFilled } from "@ant-design/icons";

import { CustomForm, FormItem, InputFelid, Label } from "./style";
import { Col, Row } from "antd";
import {
  addWorkouts,
  getWorkouts,
  deleteWorkout,
} from "../../actions/WorkoutAction";
import WorkoutModal from "./Modals/WorkoutModal";
import WorkoutEdit from "./Edit/WorkoutEdit";
import { userRoles } from "../../resources/UserRoles";
import { workoutSchema } from "../utils/validations";

const Workouts = () => {
  const user = JSON.parse(sessionStorage.getItem("profile"));

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Main Goal",
      dataIndex: "mainGoal",
      key: "mainGoal",
    },
    {
      title: "Training Level",
      dataIndex: "trainingLevel",
      key: "trainingLevel",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => {
        return (
          <IconWrapper>
            <EyeFilled
              onClick={() => {
                handleViewWorkout(record);
              }}
              style={{ cursor: "pointer" }}
            />
            {userRoles.MEMBER !== user?.userRole && (
              <EditOutlined
                onClick={() => {
                  handleEditWorkout(record);
                }}
                style={{ cursor: "pointer" }}
              />
            )}
            {(userRoles.ADMIN === user?.userRole ||
              userRoles.INSTRUCTOR === user?.userRole) && (
              <DeleteFilled
                onClick={() => {
                  delWorkout(record);
                }}
                style={{ cursor: "pointer" }}
              />
            )}
          </IconWrapper>
        );
      },
    },
  ];
  const [addWorkout, setAddWorkout] = useState(false);
  const [workouts, setWorkouts] = useState([]);
  const [workout, setWorkout] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [errors, setErrors] = useState({});
  const [validationMode, setValidationMode] = useState(false);
  const [inputs, setInputs] = useState({
    title: "",
    mainGoal: "",
    trainingLevel: "",
    type: "",
    duration: "",
    targetGender: "",
    description: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const handleEditWorkout = (Workout) => {
    setWorkout(Workout);
    setEditMode(true);
  };

  const delWorkout = (Workout) => {
    console.log(Workout);
    deleteWorkout(Workout);
    setRefresh(true);
  };

  const handleViewWorkout = (workout) => {
    setWorkout(workout);
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    setValidationMode(true);
    workoutSchema
      .validate(inputs, { abortEarly: false })
      .then(() => {
        addWorkouts(inputs);
        clearForm();
        setValidationMode(false);
        setErrors(null);
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
      workoutSchema
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

  const clearForm = () => {
    setInputs({
      title: "",
      mainGoal: "",
      trainingLevel: "",
      type: "",
      duration: "",
      targetGender: "",
      description: "",
    });
  };
  const handleOnChange = (event) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  };

  const handleFetchData = async () => {
    setWorkouts(await getWorkouts());
  };

  useEffect(() => {
    handleFetchData();
  }, [addWorkout, editMode, isModalOpen, refresh]);

  const handleOk = () => {
    setIsModalOpen(false);
  };
  return (
    <Container>
      {editMode ? (
        <>
          <ButtonContainer style={{ justifyContent: "flex-start" }}>
            <AddButton onClick={() => setEditMode(false)}>BACK</AddButton>
          </ButtonContainer>
          <WorkoutEdit workout={workout} setEditMode={setEditMode} />
        </>
      ) : (
        <>
          {userRoles.MEMBER !== user?.userRole && (
            <ButtonContainer>
              {addWorkout ? (
                <AddButton onClick={() => setAddWorkout(false)}>
                  VIEW WORKOUTS
                </AddButton>
              ) : (
                <AddButton onClick={() => setAddWorkout(true)}>
                  ADD WORKOUTS
                </AddButton>
              )}
            </ButtonContainer>
          )}
          {!addWorkout ? (
            <CustomTable dataSource={workouts} columns={columns} />
          ) : (
            <FormContainer>
              <CustomForm>
                <Row gutter={24}>
                  <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                    <FormItem>
                      <Label>Title</Label>
                      <InputFelid
                        name="title"
                        onChange={handleOnChange}
                        value={inputs.title}
                      />
                      {errors?.title && (
                        <ErrorMessage>{errors?.title}</ErrorMessage>
                      )}
                    </FormItem>
                  </Col>
                  <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                    <FormItem>
                      <Label>Main Goal</Label>
                      <InputFelid
                        name="mainGoal"
                        onChange={handleOnChange}
                        value={inputs.mainGoal}
                      />
                      {errors?.mainGoal && (
                        <ErrorMessage>{errors?.mainGoal}</ErrorMessage>
                      )}
                    </FormItem>
                  </Col>
                  <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                    <FormItem>
                      <Label>Duration</Label>
                      <InputFelid
                        name="duration"
                        onChange={handleOnChange}
                        value={inputs.duration}
                      />
                      {errors?.duration && (
                        <ErrorMessage>{errors?.duration}</ErrorMessage>
                      )}
                    </FormItem>
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                    <FormItem>
                      <Label>Target Gender</Label>
                      <CustomSelect
                        options={[
                          { value: "male", label: "Male" },
                          { value: "female", label: "Female" },
                          { value: "both", label: "Both" },
                        ]}
                        defaultValue="male"
                        onChange={(value) => {
                          setInputs({ ...inputs, targetGender: value });
                        }}
                        value={inputs.targetGender}
                      />
                      {errors?.targetGender && (
                        <ErrorMessage>{errors?.targetGender}</ErrorMessage>
                      )}
                    </FormItem>
                  </Col>
                  <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                    <FormItem>
                      <Label>Type</Label>
                      <InputFelid
                        name="type"
                        onChange={handleOnChange}
                        value={inputs.type}
                      />
                      {errors?.type && (
                        <ErrorMessage>{errors?.type}</ErrorMessage>
                      )}
                    </FormItem>
                  </Col>
                  <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                    <FormItem>
                      <Label>Training Level</Label>
                      <CustomSelect
                        options={[
                          { value: "easy", label: "Easy" },
                          { value: "medium", label: "Medium" },
                          { value: "hard", label: "Hard" },
                        ]}
                        defaultValue="easy"
                        onChange={(value) => {
                          setInputs({ ...inputs, trainingLevel: value });
                        }}
                        value={inputs.trainingLevel}
                      />
                      {errors?.trainingLevel && (
                        <ErrorMessage>{errors?.trainingLevel}</ErrorMessage>
                      )}
                    </FormItem>
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                    <FormItem>
                      <Label>Description</Label>
                      <InputFelid
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
                <FormItem style={{ alignItems: "flex-end" }}>
                  <CreateButton
                    type="primary"
                    htmlType="submit"
                    onClick={handleCreate}
                  >
                    SUBMIT
                  </CreateButton>
                </FormItem>
              </CustomForm>
            </FormContainer>
          )}
        </>
      )}

      <WorkoutModal
        isModalOpen={isModalOpen}
        onOk={handleOk}
        workout={workout}
      />
    </Container>
  );
};

export default Workouts;
