import React, { useState } from 'react'
import { CustomTab } from './style';
import Equipments from '../Tabs/Equipments';
import Trainers from '../Tabs/Trainers';
import Members from '../Tabs/Members';
import Member from '../Registration/Member';
import Trainer from '../Registration/Trainer';
import Workouts from '../Tabs/Workouts';
import Summary from '../Tabs/Summary';
import EquipmentRequest from '../Tabs/EquipmentRequest';
import PDFFile from '../Tabs/PDFFile';


const AdminDashboard = () => {
  const [forceRender, setForceRender] = useState(false);
  const onChange = (key) => {
    console.log(key);
    setForceRender(!forceRender);
  };
  const items = [
    {
      key: '1',
      label: `Summary`,
      children: <Summary forceRender={forceRender}/>
    },
    {
      key: '2',
      label: `Members`,
      children: <Members forceRender={forceRender}/>,
    },
    {
      key: '3',
      label: `Trainers`,
      children: <Trainers forceRender={forceRender}/>,
    },
    {
      key: '4',
      label: `Equipments`,
      children: <Equipments forceRender={forceRender}/>,
    },
    {
      key: '5',
      label: `Exercises`,
      children: <Workouts />,
    },
    {
      key: '6',
      label: `Register Members`,
      children: <Member setForceRender={setForceRender}/>,
    },
    {
      key: '7',
      label: `Register Trainers`,
      children: <Trainer setForceRender={setForceRender}/>,
    },
    {
      key: '8',
      label: `Member Requests`,
      children: <EquipmentRequest forceRender={forceRender}/>,
    },
    {
      key: '9',
      label: `Stats`,
      children: <PDFFile forceRender={forceRender}/>,
    },
  ];
  
  return (
    <div>
      <CustomTab defaultActiveKey="1" items={items} onChange={onChange} />
    </div>
  )
}

export default AdminDashboard