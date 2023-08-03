import React from "react";
import { Container, Logo, NavContent, NavItem } from "./style";
import { useNavigate } from "react-router-dom";
import { userRoles } from "../../resources/UserRoles";

const Navbar = ({ user, userRole }) => {
  const navigate = useNavigate();

  return (
    <Container>
      <Logo>
        Friends & Fitness <span>Sports Club</span>{" "}
      </Logo>
      <NavContent halfwidth = {userRole === userRoles.ADMIN ? "true": undefined}>
        {!user && <NavItem onClick={() => navigate("/home")}>Home</NavItem>}
        {user && <NavItem onClick={() => navigate("/dashboard")}>Dashboard</NavItem>}
        <NavItem onClick={() => navigate("/aboutUs")}>About Us</NavItem>
        <NavItem onClick={() => navigate("/contactUs")}>Contact</NavItem>
      </NavContent>
    </Container>
  );
};

export default Navbar;
