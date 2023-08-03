import React, { useEffect, useState } from "react";
import { RootContainer, UserName } from "./style";
import { userRoles } from "../../resources/UserRoles";
import AdminDashboard from "./AdminDashboard";
import InstructorDashBoard from "./InstructorDashBoard";
import MemberDashboard from "./MemberDashboard";
import { getMemberByID, getTrainerByID } from "../../actions/AuthActions";

const Dashboard = ({ userRole }) => {
  const [user, setUser] = useState(
    JSON.parse(sessionStorage.getItem("profile"))
  );

  const fetchData = async () => {
    if (user?.userRole === userRoles.MEMBER) {
      const data = await getMemberByID(user?.userID);
      sessionStorage.setItem("profile", JSON.stringify(data));
      setUser(data);
    } else if (user?.userRole === userRoles.INSTRUCTOR) {
      const data = await getTrainerByID(user?.userID);
      sessionStorage.setItem("profile", JSON.stringify(data));
      setUser(data);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const renderDashboard = () => {
    switch (userRole) {
      case userRoles.ADMIN:
        return <AdminDashboard />;
      case userRoles.INSTRUCTOR:
        return <InstructorDashBoard />;
      case userRoles.MEMBER:
        return <MemberDashboard />;
      default:
        return <h1>Not Found</h1>;
    }
  };
  return (
    <RootContainer>
      <UserName>
        Welcome, <span>{user?.fullName}</span>
        <p>({user?.userRole})</p>
      </UserName>
      {renderDashboard()}
    </RootContainer>
  );
};

export default Dashboard;
