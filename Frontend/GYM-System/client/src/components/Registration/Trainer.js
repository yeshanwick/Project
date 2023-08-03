import React, { useEffect, useState } from "react";
import { Row, Col } from "antd";
import {
  CustomDatePicker,
  CustomForm,
  CustomSelect,
  FormItem,
  InputFelid,
  Label,
  RegisterButton,
  Container,
} from "./style";
import { registerUsers } from "../../actions/RegistrationActions";
import { userRoles } from "../../resources/UserRoles";
import dayjs from "dayjs";
import { ErrorMessage } from "../Tabs/style";
import { validationSchemaTrainerRegistration } from "../utils/validations";

const Trainer = ({ setForceRender }) => {
  const [inputs, setInputs] = useState({
    fullName: "",
    email: "",
    nic: "",
    dob: "",
    gender: "",
    mobile: "",
    password: "",
    branch: "",
    specialty: "",
  });
  const [errors, setErrors] = useState({});
  const [validationMode, setValidationMode] = useState(false);
  const handleRegister = () => {
    setValidationMode(true);
    validationSchemaTrainerRegistration
        .validate(inputs, { abortEarly: false })
        .then(() => {
          registerUsers(inputs, userRoles.INSTRUCTOR);
          clearForm();
          setForceRender((prev) => !prev);
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
      validationSchemaTrainerRegistration
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
      fullName: "",
      email: "",
      nic: "",
      dob: "",
      gender: "",
      mobile: "",
      password: "",
      branch: "",
      specialty: "",
    });
  };
  const handleOnChange = (event) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  };
  const handleOnChangeDatePicker = (date) => {
    setInputs({ ...inputs, dob: date });
  };
  return (
    <Container>
      <CustomForm>
        <Row gutter={24}>
          <Col xs={24} sm={24} md={12} lg={8} xl={8}>
            <FormItem>
              <Label>Full Name</Label>
              <InputFelid
                name="fullName"
                onChange={handleOnChange}
                value={inputs.fullName}
              />
              {errors?.fullName && (
                <ErrorMessage>{errors?.fullName}</ErrorMessage>
              )}
            </FormItem>
          </Col>
          <Col xs={24} sm={24} md={12} lg={8} xl={8}>
            <FormItem>
              <Label>Birthday</Label>
              <CustomDatePicker
                name="dob"
                onChange={handleOnChangeDatePicker}
                value={inputs.dob}
              />
              {errors?.dob && (
                <ErrorMessage>{errors?.dob}</ErrorMessage>
              )}
            </FormItem>
          </Col>
          <Col xs={24} sm={24} md={12} lg={8} xl={8}>
            <FormItem>
              <Label>Gender</Label>
              <CustomSelect
                options={[
                  { value: "male", label: "Male" },
                  { value: "female", label: "Female" },
                  { value: "not to reveal", label: "Not to Reveal" },
                ]}
                onChange={(value) => {
                  setInputs({ ...inputs, gender: value });
                }}
                value={inputs.gender}
              />
              {errors?.gender && (
                <ErrorMessage>{errors?.gender}</ErrorMessage>
              )}
            </FormItem>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col xs={24} sm={24} md={12} lg={8} xl={8}>
            <FormItem>
              <Label>NIC</Label>
              <InputFelid
                name="nic"
                onChange={handleOnChange}
                value={inputs.nic}
              />
              {errors?.nic && (
                <ErrorMessage>{errors?.nic}</ErrorMessage>
              )}
            </FormItem>
          </Col>
          <Col xs={24} sm={24} md={12} lg={8} xl={8}>
            <FormItem>
              <Label>Mobile</Label>
              <InputFelid
                name="mobile"
                onChange={handleOnChange}
                value={inputs.mobile}
              />
              {errors?.mobile && (
                <ErrorMessage>{errors?.mobile}</ErrorMessage>
              )}
            </FormItem>
          </Col>
          <Col xs={24} sm={24} md={12} lg={8} xl={8}>
            <FormItem>
              <Label>Email</Label>
              <InputFelid
                name="email"
                onChange={handleOnChange}
                value={inputs.email}
              />
              {errors?.email && (
                <ErrorMessage>{errors?.email}</ErrorMessage>
              )}
            </FormItem>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col xs={24} sm={24} md={12} lg={8} xl={8}>
            <FormItem>
              <Label>Branch</Label>
              <CustomSelect
                defaultValue={"hikkaduwa"}
                options={[
                  { value: "hikkaduwa", label: "Hikkaduwa" },
                  { value: "unawatuna", label: "Unawatuna" },
                ]}
                onChange={(value) => {
                  setInputs({ ...inputs, branch: value });
                }}
                value={inputs.branch}
              />
              {errors?.branch && (
                <ErrorMessage>{errors?.branch}</ErrorMessage>
              )}
            </FormItem>
          </Col>
          <Col xs={24} sm={24} md={12} lg={8} xl={8}>
            <FormItem>
              <Label>Specialty</Label>
              <CustomSelect
                options={[
                  { label: "Weight Loss", value: "Weight Loss" },
                  { label: "Muscle Building", value: "Muscle Building" },
                  {
                    label: "Athletic Performance",
                    value: "Athletic Performance",
                  },
                ]}
                onChange={(value) => {
                  setInputs({ ...inputs, specialty: value });
                }}
                value={inputs.specialty}
              />
              {errors?.specialty && (
                <ErrorMessage>{errors?.specialty}</ErrorMessage>
              )}
            </FormItem>
          </Col>
          <Col xs={24} sm={24} md={12} lg={8} xl={8}>
            <FormItem>
              <Label>Password</Label>
              <InputFelid
                name="password"
                onChange={handleOnChange}
                value={inputs.password}
              />
              {errors?.password && (
                <ErrorMessage>{errors?.password}</ErrorMessage>
              )}
            </FormItem>
          </Col>
        </Row>

        <FormItem style={{ alignItems: "center" }}>
          <RegisterButton
            type="primary"
            htmlType="submit"
            onClick={handleRegister}
          >
            SUBMIT
          </RegisterButton>
        </FormItem>
      </CustomForm>
    </Container>
  );
};

export default Trainer;
