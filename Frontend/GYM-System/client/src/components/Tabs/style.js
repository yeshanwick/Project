import { Button, Checkbox, DatePicker, Input, Select, Table } from "antd";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;
export const EditContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgb(12, 32, 40, 0.9);
  height: 97%;
  padding: 20px;
`;

export const CustomTable = styled(Table)``;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const AddButton = styled(Button)`
  background: #ffa500;
  font-family: NationalBold, Helvetica, Arial, Sans-serif;
  font-size: 20px;
  height: auto !important;
  padding: 12px;
`;

export const FormContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgb(12, 32, 40, 0.9);
  height: 97%;
  padding: 20px;
`;

export const CustomForm = styled.div`
  width: 100%;
  margin: 0px 100px;
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

export const InputFelid = styled(Input)`
  border: 1px solid #ffa500;
  border-radius: 5;
  background: #505c55;
  height: 45px;
  width: 100%;
`;

export const InputFelidModel = styled(Input)`
  border: 1px solid #ffa500;
  border-radius: 5;
  background: white;
  height: 45px;
  width: 100%;
`;

export const CreateButton = styled(Button)`
  background: #ffa500;
  border: none;
  // width: 100%;
  margin-top: 20px;
  margin-right: 15px;
  color: white;
  font-family: NationalBold, Helvetica, Arial, Sans-serif;
`;

export const FormItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;
`;
export const Label = styled.p`
  color: #e4e4e4;
  font-size: 20px;
  font-family: NationalBold, Helvetica, Arial, Sans-serif;
`;
export const LabelModal = styled.p`
  color: black;
  font-size: 12px;
  font-family: NationalBold, Helvetica, Arial, Sans-serif;
`;

export const AssignTitle = styled.p`
  color: black;
  font-size: 17px;
  font-weight: 600;
  font-family: NationalBold, Helvetica, Arial, Sans-serif;
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

export const IconWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

export const CheckBoxes = styled(Checkbox.Group)`
  .ant-checkbox-wrapper {
    color: white;
    font-size: 20px;
    font-family: NationalBold, Helvetica, Arial, Sans-serif;
  }
  // margin-top: 5px;
`;

export const CustomDatePicker = styled(DatePicker)`
  border: 1px solid #ffa500;
  border-radius: 5;
  background: #505c55;
  height: 45px;
  width: 100%;
`;

export const ModalSelectWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  gap: 10px;
`;

export const CustomModalSelect = styled(Select)`
  border: 1px solid #ffa500;
  border-radius: 5px;
  height: 40px;
  width: 50%;
  .ant-select-selector {
    border: none !important;
  }
`;

export const AssignButton = styled(Button)`
  border: 1px solid #ffa500;
  border-radius: 5px;
  height: auto;
  background: orange;
  font-size: 15px;
  font-family: NationalBold, Helvetica, Arial, Sans-serif;
  font-weight: 600;
`;
export const CardContainer = styled.div`
  display: flex;
  // flex-direction: column;
  justify-content: space-between;
  gap: 40px;
`;
export const CardContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 40px;
  color: orange;
  font-weight: 700;
`;
export const RateContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 10px;
`;

export const RateTitle = styled.p`
  color: white;
  font-size: 20px;
`;

export const Circle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: orange;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 64px;
  font-weight: bold;
`;

export const MarkingContainer = styled.div``;
export const MakingTitle = styled.div`
  font-weight: 600;
`;

export const ProfileContent = styled.div`
  color: white;
  background: rgb(255, 255, 255, 0.1);
  padding: 50px;
  border-radius: 20px;
`;

export const DataItem = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 10px;
`;
export const DataTitle = styled.div`
  font-size: 15px;
`;

export const Data = styled.div`
  font-size: 20px;
`;

export const LogoutWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const LogoutButton = styled(Button)`
  border: 1px solid red;
  border-radius: 5px;
  height: auto;
  background: red;
  font-size: 15px;
  font-family: NationalBold, Helvetica, Arial, Sans-serif;
  font-weight: 600;
`;

export const ErrorMessage = styled.p`
  color: red;
  font-size: 13px;
  font-family: NationalBold, Helvetica, Arial, Sans-serif;
  display: flex;
  justify-content: flex-start;
  width: 100%;
`;

export const TagContainer = styled.p`
  display: flex;
  font-family: NationalBold, Helvetica, Arial, Sans-serif;
  flex-wrap: wrap;
  gap: 5px;
`;


export const PDFContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  overflow-x: hidden;
  overflow-y: auto;
  height: 60vh;
  align-items: center;
`;