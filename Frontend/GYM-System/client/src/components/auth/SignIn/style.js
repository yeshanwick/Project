import styled from "styled-components";
import { Button, Input } from "antd";

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px solid #ffa500;
  border-radius: 10px;
  padding: 20px;
  width: 500px;
  gap: 2rem;
`;

export const InputFelid = styled(Input)`
  border: none;
  border-bottom: 1px solid white;
  border-radius: 0;
  background: transparent;
  color: white;
  &::placeholder {
    color: gray;
    font-size: 20px;
    font-style: italic;
  }
`;

export const LoginButton = styled(Button)`
  background: #ffa500;
  border: none;
  width: 100%;
  color: white;
  font-family: NationalBold, Helvetica, Arial, Sans-serif;
`;

export const ForgotPassword = styled.p`
  color: gray;
  font-family: NationalBold, Helvetica, Arial, Sans-serif;
`;
export const ErrorMessage = styled.p`
  color: red;
  font-size: 13px;
  font-family: NationalBold, Helvetica, Arial, Sans-serif;
  display: flex;
  justify-content: flex-start;
  width: 100%;
`;

export const InputFelidWrapper = styled.div`
  width: 100%;
`;