import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgb(12, 32, 40);
  height: 97%;
`;

export const AuthTitle = styled.p`
  font-family: NationalBold, Helvetica, Arial, Sans-serif;
  font-size: 35px;
  color: white;
`;

export const AuthFooter = styled.p`
  font-family: NationalBold, Helvetica, Arial, Sans-serif;
  font-size: 20px;
  color: white;
  span {
    color: #ffa500;
    cursor: pointer;
  }
`;

