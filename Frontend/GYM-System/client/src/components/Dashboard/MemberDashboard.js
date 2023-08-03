import React, { useState } from "react";
import Summary from "../Tabs/Summary";
//import Members from "../Tabs/Members";
import Equipments from "../Tabs/Equipments";
//import Workouts from "../Tabs/Workouts";
import { CustomTab } from "./style";
import AssignedWorkouts from "../Tabs/AssignedWorkouts";
import Profile from "../Tabs/Profile";
import EquipmentRequest from "../Tabs/EquipmentRequest";
import Meals from "../Tabs/Meals";
//import PDFFile from "../Tabs/PDFFile";

const MemberDashboard = () => {
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
      label: `Equipments`,
      children: <Equipments forceRender={forceRender}/>,
    },
    {
      key: "3",
      label: `Assigned Exercise`,
      children: <AssignedWorkouts forceRender={forceRender} />,
    },
    {
      key: '4',
      label: `Equipment Requests`,
      children: <EquipmentRequest forceRender={forceRender}/>,
    },

    {
      key: '5',
      label: `Calory`,
      children: <Meals forceRender={forceRender}/>,
    },
    {
      key: "6",
      label: `Profile`,
      children: <Profile setForceRender={setForceRender} />,
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

export default MemberDashboard;
