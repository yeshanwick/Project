import React, { useEffect, useState } from "react";
import { EditContainer, ErrorMessage } from "../style";
import { CreateButton } from "../style";

import { CustomForm, FormItem, InputFelid, Label } from "../style";
import { Col, Row } from "antd";
import { updateEquipment } from "../../../actions/EquipmentAction";
import { equipmentSchema } from "../../utils/validations";
const EquipmentEdit = ({ equipment, setEditMode }) => {
  const [inputs, setInputs] = useState(equipment);
  const [errors, setErrors] = useState({});
  const [validationMode, setValidationMode] = useState(false);
  const handleUpdate = () => {
    setValidationMode(true);
    equipmentSchema
      .validate(inputs, { abortEarly: false })
      .then(async () => {
        const res = await updateEquipment(inputs);
        if (res) {
          setEditMode(false);
        }
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

  const handleOnChange = (event) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  };
  return (
    <EditContainer>
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
              {errors?.name && <ErrorMessage>{errors?.name}</ErrorMessage>}
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
              onClick={handleUpdate}
            >
              SUBMIT
            </CreateButton>
          </FormItem>
        </Row>
      </CustomForm>
    </EditContainer>
  );
};

export default EquipmentEdit;
