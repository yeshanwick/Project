import { Col, Descriptions, Modal, Row, Select } from "antd";
import React, { useEffect, useState } from "react";
import { userRoles } from "../../../resources/UserRoles";
import {
  AssignButton,
  AssignTitle,
  CustomModalSelect,
  ErrorMessage,
  FormItem,
  InputFelidModel,
  LabelModal,
} from "../style";
import {
  getAvailableEquipment,
  requestEquipment,
} from "../../../actions/EquipmentAction";
import { userRequestSchema } from "../../utils/validations";

const EquipmentModal = ({ isModalOpen, onOk, equipment }) => {
  const [inputs, setInputs] = useState({
    memberId: JSON.parse(sessionStorage.getItem("user")),
    count: "",
    status: "Active",
  });
  console.log(equipment);
  const [equipments, setEquipments] = useState([]);
  const [errors, setErrors] = useState({});
  const [validationMode, setValidationMode] = useState(false);
  const user = JSON.parse(sessionStorage.getItem("profile"));
  const clear = () => {
    setInputs({
      memberId: JSON.parse(sessionStorage.getItem("user")),
      count: "",
      status: "Active",
    });
  };

  const fetchData = async () => {
    setEquipments(await getAvailableEquipment());
  };
  useEffect(() => {
    fetchData();
  }, []);
  const handleUserRequest = () => {
    setValidationMode(true);
    userRequestSchema
      .validate(inputs, { abortEarly: false })
      .then(async () => {
        const res = await requestEquipment(inputs, equipment.id);
        if (res) {
          clear();
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
      userRequestSchema
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
  return (
    <Modal
      title="Equipment Details"
      cancelButtonProps={{ style: { display: "none" } }}
      open={isModalOpen}
      onOk={onOk}
      width={800}
      onCancel={onOk}
    >
      <Descriptions title={equipment?.name}>
        <Descriptions.Item label="Total Count">
          {equipment?.totalCount ? equipment?.totalCount : "--"}
        </Descriptions.Item>
        <Descriptions.Item label="Available Count">
          {equipment?.availableCount ? equipment?.availableCount : "--"}
        </Descriptions.Item>
        <Descriptions.Item label="Description">
          {equipment?.description ? equipment?.description : "--"}
        </Descriptions.Item>
      </Descriptions>
      {user?.userRole === userRoles.MEMBER && equipment.availableCount > 0 && (
        <>
          <Row>
            <AssignTitle>Request Equipment</AssignTitle>
          </Row>

          <Row gutter={16}>
            <Col xs={24} sm={24} md={12}>
              <FormItem>
                <LabelModal>Equipment</LabelModal>
                <CustomModalSelect
                  style={{ width: "100%" }}
                  disabled
                  value={equipment.id}
                >
                  {equipments?.map((item) => (
                    <Select.Option key={item.id} value={item.id}>
                      {item.name}
                    </Select.Option>
                  ))}
                </CustomModalSelect>
              </FormItem>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <FormItem>
                <LabelModal>Count</LabelModal>
                <InputFelidModel
                  style={{ height: "40px" }}
                  name="count"
                  type="number"
                  onChange={(event) =>
                    setInputs({ ...inputs, count: event.target.value })
                  }
                  value={inputs.count}
                />
                {errors?.count && <ErrorMessage>{errors?.count}</ErrorMessage>}
              </FormItem>
            </Col>
          </Row>
          <Row justify={"end"}>
            <AssignButton
              onClick={handleUserRequest}
              style={{ marginTop: "10px" }}
            >
              Request
            </AssignButton>
          </Row>
        </>
      )}
    </Modal>
  );
};

export default EquipmentModal;
