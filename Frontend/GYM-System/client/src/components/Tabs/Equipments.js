import React, { useEffect, useState } from "react";
import {
  AddButton,
  ButtonContainer,
  Container,
  CreateButton,
  CustomTable,
  ErrorMessage,
  FormContainer,
  IconWrapper,
} from "./style";
import { DeleteFilled, EditOutlined, EyeFilled } from "@ant-design/icons";

import { CustomForm, FormItem, InputFelid, Label } from "./style";
import { Col, Row } from "antd";
import {
  addEquipment,
  getEquipment,
  deleteEquipment,
} from "../../actions/EquipmentAction";
import EquipmentModal from "./Modals/EquipmentModal";
import EquipmentEdit from "./Edit/EquipmentEdit";
import { userRoles } from "../../resources/UserRoles";
import { equipmentSchema } from "../utils/validations";

const Equipments = ({forceRender}) => {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Total Count",
      dataIndex: "totalCount",
      key: "totalCount",
    },
    {
      title: "Available for this hour",
      dataIndex: "availableCount",
      key: "availableCount",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => {
        return (
          <IconWrapper>
            <EyeFilled
              onClick={() => {
                handleViewEquipment(record);
              }}
              style={{ cursor: "pointer" }}
            />
            {userRoles.ADMIN === user?.userRole && (
              <EditOutlined
                onClick={() => {
                  handleEditEquipment(record);
                }}
                style={{ cursor: "pointer" }}
              />
            )}
            {(userRoles.ADMIN === user?.userRole ||
              userRoles.INSTRUCTOR === user?.userRole) && (
              <DeleteFilled
                onClick={() => {
                  handleEquipmentDelete(record);
                }}
                style={{ cursor: "pointer" }}
              />
            )}
          </IconWrapper>
        );
      },
    },
  ];
  const user = JSON.parse(sessionStorage.getItem("profile"));
  const [addEquip, setAddEquip] = useState(false);
  const [equipments, setEquipments] = useState([]);
  const [equipment, setEquipment] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [errors, setErrors] = useState({});
  const [validationMode, setValidationMode] = useState(false);
  const [inputs, setInputs] = useState({
    name: "",
    totalCount: "",
    availableCount: "",
    description: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const handleEditEquipment = (equipment) => {
    setEquipment(equipment);
    setEditMode(true);
  };

  const handleEquipmentDelete = (equipment) => {
    console.log(equipment);
    deleteEquipment(equipment);
    setRefresh(!refresh);
  };

  const handleViewEquipment = (equipment) => {
    setEquipment(equipment);
    setIsModalOpen(true);
  };
  const handleCreate = () => {
    setValidationMode(true);
    equipmentSchema
      .validate(inputs, { abortEarly: false })
      .then(() => {
        addEquipment(inputs);
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
      equipmentSchema
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
      name: "",
      totalCount: "",
      availableCount: "",
      description: "",
    });
  };
  const handleOnChange = (event) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  };

  const handleFetchData = async () => {
    setEquipments(await getEquipment());
  };

  useEffect(() => {
    handleFetchData();
  }, [addEquip, editMode, isModalOpen, forceRender, refresh]);

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
          <EquipmentEdit equipment={equipment} setEditMode={setEditMode} />
        </>
      ) : (
        <>
          {userRoles.ADMIN === user?.userRole && (
            <ButtonContainer>
              {addEquip ? (
                <AddButton onClick={() => setAddEquip(false)}>
                  VIEW EQUIPMENTS
                </AddButton>
              ) : (
                <AddButton onClick={() => setAddEquip(true)}>
                  ADD EQUIPMENTS
                </AddButton>
              )}
            </ButtonContainer>
          )}
          {!addEquip ? (
            <CustomTable dataSource={equipments} columns={columns} />
          ) : (
            <FormContainer>
              <CustomForm>
                <Row gutter={24} style={{ gap: "30px" }}>
                  <Col span={24}>
                    <FormItem>
                      <Label>Name</Label>
                      <InputFelid
                        name="name"
                        onChange={handleOnChange}
                        value={inputs.name}
                      />
                      {errors?.name && (
                        <ErrorMessage>{errors?.name}</ErrorMessage>
                      )}
                    </FormItem>
                  </Col>
                  <Col span={24}>
                    <FormItem>
                      <Label>Total Count</Label>
                      <InputFelid
                        type="number"
                        name="totalCount"
                        onChange={handleOnChange}
                        value={inputs.totalCount}
                      />
                      {errors?.totalCount && (
                        <ErrorMessage>{errors?.totalCount}</ErrorMessage>
                      )}
                    </FormItem>
                  </Col>
                  <Col span={24}>
                    <FormItem>
                      <Label>Available Count</Label>
                      <InputFelid
                        type="number"
                        name="availableCount"
                        onChange={handleOnChange}
                        value={inputs.availableCount}
                      />
                      {errors?.availableCount && (
                        <ErrorMessage>{errors?.availableCount}</ErrorMessage>
                      )}
                    </FormItem>
                  </Col>
                  <Col span={24}>
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

                  <FormItem style={{ alignItems: "flex-end" }}>
                    <CreateButton
                      type="primary"
                      htmlType="submit"
                      onClick={handleCreate}
                    >
                      SUBMIT
                    </CreateButton>
                  </FormItem>
                </Row>
              </CustomForm>
            </FormContainer>
          )}
        </>
      )}

      <EquipmentModal
        isModalOpen={isModalOpen}
        onOk={handleOk}
        equipment={equipment}
      />
    </Container>
  );
};

export default Equipments;
