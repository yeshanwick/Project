import React, { useState } from "react";
import { CustomTab } from "./style";
import Summary from "../Tabs/Summary";
import Members from "../Tabs/Members";
import Equipments from "../Tabs/Equipments";
import Workouts from "../Tabs/Workouts";
import AssignedWorkouts from "../Tabs/AssignedWorkouts";
import Profile from "../Tabs/Profile";
import EquipmentRequest from "../Tabs/EquipmentRequest";
//import PDFFile from "../Tabs/PDFFile";

const InstructorDashBoard = () => {
  const [forceRender, setForceRender] = useState(false);
  const onChange = (key) => {
    console.log(key);
    setForceRender(!forceRender);
  };
  const items = [
    {
      key: "1",
      label: `Summary`,
      children: <Summary forceRender={forceRender} />,
    },
    {
      key: "2",
      label: `All Members`,
      children: <Members forceRender={forceRender} />,
    },
    {
      key: "3",
      label: `Members Assign to Me`,
      children: <Members forceRender={forceRender} trainerMode={true} />,
    },
    {
      key: "4",
      label: `Equipments`,
      children: <Equipments />,
    },
    {
      key: "5",
      label: `Exercises`,
      children: <Workouts />,
    },
    {
      key: "6",
      label: `Assigned Exercise`,
      children: <AssignedWorkouts forceRender={forceRender} />,
    },
    {
      key: '7',
      label: `Equipment Requests`,
      children: <EquipmentRequest forceRender={forceRender}/>,
    },
    {
      key: "8",
      label: `Profile`,
      children: <Profile forceRender={forceRender} />,
    },
    // {
    //   key: '9',
    //   label: `Stats`,
    //   children: <PDFFile forceRender={forceRender}/>,
    // },
  ];
  return (
    <div>
      <CustomTab defaultActiveKey="1" items={items} onChange={onChange} />
    </div>
  );
};

export default InstructorDashBoard;
