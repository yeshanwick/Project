import styled from "styled-components";
import { Button, Carousel } from "antd";

export const Container = styled.div`
  padding: 30px;
`;

export const CustomCarousel = styled(Carousel)`
  .slick-slide {
    height: 60vh;
  }
`;

export const CarouselItem = styled.img`
  width: 100%;
`;

export const AuthButtons = styled.div`
  display: flex;
  gap: 5rem;
  justify-content: center;
  margin-top: 40px;
`;
export const LoginButton = styled(Button)`
  border-radius: 73px;
  width: 215px;
  height: 59px;
  background-color: #ffa500;
  border: 1px solid black;
  color: black;
  font-size: 23px;
  font-weight: 700;
  font-family: NationalBold, Helvetica, Arial, Sans-serif;
`;
export const SignUpButton = styled(Button)`
  width: 215px;
  height: 59px;
  border-radius: 73px;
  background-color: white;
  border: 1px solid black;
  color: black;
  font-size: 23px;
  font-weight: 700;
  font-family: NationalBold, Helvetica, Arial, Sans-serif;
`;
