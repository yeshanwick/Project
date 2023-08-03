import { Button, Checkbox, DatePicker, Input, Select } from "antd";
import styled from "styled-components";

export const CustomForm = styled.div`
  width: 100%;
  margin: 0px 100px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const InputFelid = styled(Input)`
  border: 1px solid #ffa500;
  border-radius: 5;
  background: #505c55;
  height: 35px;
  width: 100%;
  color: white;
`;

export const CustomDatePicker = styled(DatePicker)`
  border: 1px solid #ffa500;
  border-radius: 5;
  background: #505c55;
  height: 45px;
  width: 100%;
`;

export const CustomSelect = styled(Select)`
  border: 1px solid #ffa500;
  border-radius: 5px;
  background: #505c55;
  height: 45px;
  width: 100%;
  .ant-select-selector {
    background: #505c55 !important;
    border: none !important;
  }
`;

export const SignUpButton = styled(Button)`
  background: #ffa500;
  border: none;
  width: 40%;
  color: white;
  font-family: NationalBold, Helvetica, Arial, Sans-serif;
`;

export const FormItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  // align-items: center;
`;
export const Label = styled.p`
  color: #e4e4e4;
  font-size: 20px;
  font-family: NationalBold, Helvetica, Arial, Sans-serif;
`;

export const ErrorMessage = styled.p`
  color: red;
  font-size: 13px;
  font-family: NationalBold, Helvetica, Arial, Sans-serif;
`;

export const CheckBoxes = styled(Checkbox.Group)`
  .ant-checkbox-wrapper {
    color: white;
    font-size: 15px;
    font-family: NationalBold, Helvetica, Arial, Sans-serif;
  }
  margin-top: 10px;
`;

export const SingleCheckBox = styled(Checkbox)`
  color: white;
  font-size: 15px;
  font-family: NationalBold, Helvetica, Arial, Sans-serif;
  margin-top: 10px;
`;
