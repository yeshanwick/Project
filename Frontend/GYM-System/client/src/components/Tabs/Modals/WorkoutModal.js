import { Descriptions, Modal } from "antd";
import React from "react";

const WorkoutModal = ({ isModalOpen, onOk, workout }) => {
  return (
    <Modal
      title="Exercise Details"
      cancelButtonProps={{ style: { display: "none" } }}
      open={isModalOpen}
      onOk={onOk}
      width={800}
      onCancel={onOk}
    >
      <Descriptions title={workout?.title}>
        <Descriptions.Item label="Main Goal">
          {workout?.mainGoal ? workout?.mainGoal : "--"}
        </Descriptions.Item>
        <Descriptions.Item label="Training Level">
          {workout?.trainingLevel ? workout?.trainingLevel : "--"}
        </Descriptions.Item>
        <Descriptions.Item label="Type">
          {workout?.type ? workout?.type : "--"}
        </Descriptions.Item>
        <Descriptions.Item label="Duration">
          {workout?.duration ? workout?.duration : "--"}
        </Descriptions.Item>
        <Descriptions.Item label="Target Gender">
          {workout?.targetGender ? workout?.targetGender : "--"}
        </Descriptions.Item>
        <Descriptions.Item label="Description">
          {workout?.description ? workout?.description : "--"}
        </Descriptions.Item>
      </Descriptions>
    </Modal>
  );
};

export default WorkoutModal;
