import React, { useEffect, useState } from "react";
import { CustomSelect, EditContainer, ErrorMessage } from "../style";
import { CreateButton } from "../style";

import { CustomForm, FormItem, InputFelid, Label } from "../style";
import { Col, Row } from "antd";
import { updateWorkout } from "../../../actions/WorkoutAction";
import { workoutSchema } from "../../utils/validations";

const WorkoutEdit = ({ workout, setEditMode }) => {
  const [inputs, setInputs] = useState(workout);
  const [errors, setErrors] = useState({});
  const [validationMode, setValidationMode] = useState(false);
  const handleUpdate = () => {
    setValidationMode(true);
    workoutSchema
      .validate(inputs, { abortEarly: false })
      .then(async () => {
        const res = await updateWorkout(inputs);
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

  const handleOnChange = (event) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  };
  return (
    <EditContainer>
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
               {errors?.title && <ErrorMessage>{errors?.title}</ErrorMessage>}
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
               {errors?.mainGoal && <ErrorMessage>{errors?.mainGoal}</ErrorMessage>}
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
               {errors?.duration && <ErrorMessage>{errors?.duration}</ErrorMessage>}
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
               {errors?.targetGender && <ErrorMessage>{errors?.targetGender}</ErrorMessage>}
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
               {errors?.type && <ErrorMessage>{errors?.type}</ErrorMessage>}
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
               {errors?.trainingLevel && <ErrorMessage>{errors?.trainingLevel}</ErrorMessage>}
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
               {errors?.description && <ErrorMessage>{errors?.description}</ErrorMessage>}
            </FormItem>
          </Col>
        </Row>
        <FormItem style={{ alignItems: "flex-end" }}>
          <CreateButton type="primary" htmlType="submit" onClick={handleUpdate}>
            SUBMIT
          </CreateButton>
        </FormItem>
      </CustomForm>
    </EditContainer>
  );
};

export default WorkoutEdit;
