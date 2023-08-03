import React from "react";
import { Container, SocialIcons } from "./style";
import { FacebookFilled } from "@ant-design/icons";
const Footer = () => {
  return (
    <Container>
      <span>
        Friends & Fitness Sports Club ©2023 Created by Friends & Fitness
      </span>
      <SocialIcons>
        <a href="https://www.facebook.com/friendsandfitnesssportsclub">
          <FacebookFilled />
        </a>
      </SocialIcons>
    </Container>
  );
};

export default Footer;
