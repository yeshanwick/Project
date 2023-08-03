import React, { useEffect, useState } from "react";
import {
  Card,
  ErrorMessage,
  ForgotPassword,
  InputFelid,
  InputFelidWrapper,
  LoginButton,
} from "./style";
import { AuthFooter, AuthTitle, Container } from "../style";
import { UnlockFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Form } from "antd";
import { login } from "../../../actions/AuthActions";
import { validationSchemaUserLogin } from "../../utils/validations";

const SignInPage = ({ setUserLogged }) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [validationMode, setValidationMode] = useState(false);
  const navigate = useNavigate();
  const handleLogin = () => {
    setValidationMode(true);
    validationSchemaUserLogin
    .validate(inputs, { abortEarly: false })
    .then(() => {
      login(inputs, navigateToDashBoard);
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
    setUserLogged(true);
    navigate("/dashboard", { replace: true });
  };

  const handleOnChange = (event) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    if (validationMode) {
      validationSchemaUserLogin
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
      <Form onFinish={handleLogin}>
        <Card>
          <AuthTitle>
            Log In <UnlockFilled />
          </AuthTitle>
          <InputFelidWrapper>
            <InputFelid
              name="email"
              onChange={handleOnChange}
              placeholder="Email"
              value={inputs.email}
            />
            {errors?.email && <ErrorMessage>{errors?.email}</ErrorMessage>}
          </InputFelidWrapper>
          <InputFelidWrapper>
            <InputFelid
              name="password"
              onChange={handleOnChange}
              placeholder="Password"
              type="password"
              value={inputs.password}
            />
          {errors?.password && <ErrorMessage>{errors?.password}</ErrorMessage>}
          </InputFelidWrapper>
          <LoginButton type="primary" htmlType="submit">
            LOG IN
          </LoginButton>
          <ForgotPassword>FORGOT PASSWORD ?</ForgotPassword>
          <AuthFooter>
            No Account ?
            <span onClick={() => navigate("/auth/signup")}>Sign Up</span>
          </AuthFooter>
        </Card>
      </Form>
    </Container>
  );
};

export default SignInPage;
