import React, { useEffect, useState } from "react";
import { Container } from "../style";
import { Row, Col } from "antd";
import {
  CheckBoxes,
  CustomDatePicker,
  CustomForm,
  CustomSelect,
  ErrorMessage,
  FormItem,
  InputFelid,
  Label,
  SignUpButton,
  SingleCheckBox,
} from "./style";
import { useNavigate } from "react-router-dom";
import { signUp } from "../../../actions/AuthActions";
import { validationSchemaUserRegistration } from "../../utils/validations";

const preferenceOptions = [
  { label: "Weight Loss", value: "Weight Loss" },
  { label: "Muscle Building", value: "Muscle Building" },
  { label: "Athletic Performance", value: "Athletic Performance" },
];

const SignupPage = () => {
  const [inputs, setInputs] = useState({
    fullName: "",
    email: "",
    nic: "",
    dob: "",
    gender: "",
    mobile: "",
    password: "",
    branch: "",
    purpose: [],
    other: "",
    agree: false,
  });
  const [errors, setErrors] = useState({});
  const [validationMode, setValidationMode] = useState(false);
  const navigate = useNavigate();
  const handleSignIn = () => {
    setValidationMode(true);
    validationSchemaUserRegistration
      .validate(inputs, { abortEarly: false })
      .then(() => {
        inputs.purpose.push(inputs.other);
        delete inputs.other;
        signUp(inputs, navigateToDashBoard);
      })
      .catch((validationErrors) => {
        const newErrors = {};
        validationErrors.inner.forEach((error) => {
          newErrors[error.path] = error.message;
        });
        setErrors(newErrors);
      });
  };
  const navigateToDashBoard = () => {
    navigate("/auth/login", { replace: true });
  };
  const handleOnChange = (event) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  };
  const handleOnChangeDatePicker = (date) => {
    setInputs({ ...inputs, dob: date });
  };

  useEffect(() => {
    if (validationMode) {
      validationSchemaUserRegistration
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
              {errors?.dob && <ErrorMessage>{errors?.dob}</ErrorMessage>}
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
              {errors?.gender && <ErrorMessage>{errors?.gender}</ErrorMessage>}
            </FormItem>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col xs={24} sm={24} md={12} lg={8} xl={8}>
            <FormItem>
              <Label>Preferred Branch</Label>
              <CustomSelect
                options={[
                  { value: "hikkaduwa", label: "Hikkaduwa" },
                  { value: "unawatuna", label: "Unawatuna" },
                ]}
                onChange={(value) => {
                  setInputs({ ...inputs, branch: value });
                }}
                value={inputs.branch}
              />
              {errors?.branch && <ErrorMessage>{errors?.branch}</ErrorMessage>}
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
              {errors?.mobile && <ErrorMessage>{errors?.mobile}</ErrorMessage>}
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
              {errors?.email && <ErrorMessage>{errors?.email}</ErrorMessage>}
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
              {errors?.nic && <ErrorMessage>{errors?.nic}</ErrorMessage>}
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
          <Col xs={24} sm={24} md={12} lg={8} xl={8}>
            <FormItem>
              <Label>Preference</Label>
              <CheckBoxes
                value={inputs.purpose}
                options={preferenceOptions}
                onChange={(value) => setInputs({ ...inputs, purpose: value })}
              />
              <InputFelid
                name="other"
                value={inputs.other}
                onChange={handleOnChange}
              />
              {errors?.purpose && (
                <ErrorMessage>{errors?.purpose}</ErrorMessage>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <SingleCheckBox
            name="agree"
            onChange={(value) =>
              setInputs({ ...inputs, agree: value.target.checked })
            }
            value={inputs.agree}
          >
            I, agree to the terms and conditions of the gym membership and
            acknowledge that I have provided accurate and complete personal and
            health information. I understand that the gym is not liable for any
            injuries or accidents that may occur while using the facilities and
            that it is my responsibility to use the equipment and facilities
            safely and in accordance with the gym's rules and regulations.
          </SingleCheckBox>
        </Row>

        <FormItem style={{ alignItems: "center" }}>
          <SignUpButton
            disabled={!inputs.agree}
            type="primary"
            htmlType="submit"
            onClick={handleSignIn}
          >
            SUBMIT
          </SignUpButton>
        </FormItem>
      </CustomForm>
    </Container>
  );
};

export default SignupPage;
