import styled from "styled-components";

export const Container = styled.div`
  height: 9vh;
  background-color: rgba(0,0,0,0.5);
  // opacity: 0.59;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Logo = styled.div`
  padding-left: 30px;
  font-family: sans-serif;
  font-size: 55px;
  font-weight: 700;
  line-height: 56px;
  text-align: left;
  color: #ffa500;
  span {
    color: white;
    font-size: 30px;
  }

`;
export const NavContent = styled.div`
  display: flex;
  justify-content: space-around;
  width: ${props => props.halfwidth === 'true' ? '30%': '50%'}
`;

export const NavItem = styled.div`
  color: white;
  font-size: 23px;
  font-weight: 700;
  font-family: NationalBold,Helvetica,Arial,Sans-serif;
  cursor: pointer;
`;
