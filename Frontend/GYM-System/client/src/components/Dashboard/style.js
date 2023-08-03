import { Tabs } from "antd";
import styled from "styled-components";

export const RootContainer = styled.div`
  padding: 21px 100px 0px 100px;
`;

export const UserName = styled.div`
  color: white;
  font-family: NationalBold, Helvetica, Arial, Sans-serif;
  font-size: 50px;
  span {
    color: orange;
  }
  margin-bottom: 10px;
  display: flex;
  gap: 10px;
  align-items: flex-end;
  p {
    font-size: 20px;
  }
`;

export const CustomTab = styled(Tabs)`
  .ant-tabs-tab {
    background: white;
    padding: 15px 25px;
    border-radius: 10px;
    font-family: NationalBold, Helvetica, Arial, Sans-serif;
    font-size: 20px;
  }
`;
