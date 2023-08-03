import styled from "styled-components";
import backgroundImage from "./resources/images/background.png";

export const Root = styled.div`
background-image: url(${backgroundImage});
background-color: rgba(0, 0, 0, 0.7);
  height: 100vh;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

export const Container = styled.div`
  height: 80vh;
`;
