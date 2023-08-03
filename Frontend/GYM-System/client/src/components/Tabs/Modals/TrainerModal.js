import { Avatar, Descriptions, List, Modal } from "antd";
import React from "react";

const TrainerModal = ({ isModalOpen, onOk, trainer }) => {
  return (
    <Modal
      title="Trainer Details"
      cancelButtonProps={{ style: { display: "none" } }}
      open={isModalOpen}
      onOk={onOk}
      width={800}
      onCancel={onOk}
    >
      <Descriptions title={trainer?.fullName}>
        <Descriptions.Item label="UserID">{trainer?.userID}</Descriptions.Item>
        <Descriptions.Item label="Email">{trainer?.email}</Descriptions.Item>
        <Descriptions.Item label="NIC">{trainer?.nic}</Descriptions.Item>
        <Descriptions.Item label="UserRole">
          {trainer?.userRole}
        </Descriptions.Item>
        <Descriptions.Item label="Gender">
          {trainer?.gender ? trainer?.gender : "--"}
        </Descriptions.Item>
        <Descriptions.Item label="Mobile">
          {trainer?.mobile ? trainer?.mobile : "--"}
        </Descriptions.Item>
        <Descriptions.Item label="Birthday">
          {trainer?.dob ? new Date(trainer?.dob).toDateString() : "--"}
        </Descriptions.Item>
        <Descriptions.Item label="City">
          {trainer?.city ? trainer?.city : "--"}
        </Descriptions.Item>
        <Descriptions.Item label="Branch">
          {trainer?.branch ? trainer?.branch : "--"}
        </Descriptions.Item>
        <Descriptions.Item label="Specialty">
          {trainer?.specialty ? trainer?.specialty : "--"}
        </Descriptions.Item>
        <Descriptions.Item label=""></Descriptions.Item>
        <Descriptions.Item label=""></Descriptions.Item>
        <Descriptions.Item label="Members">
          {trainer?.members?.length === 0 && "--"}
        </Descriptions.Item>
      </Descriptions>
      {trainer?.members &&
        (trainer?.members?.length > 0 ? (
          <List
            itemLayout="horizontal"
            dataSource={trainer?.members}
            renderItem={(item, index) => (
              <List.Item>
                <List.Item.Meta
                  avatar={
                    <Avatar
                      src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`}
                    />
                  }
                  title={item.fullName}
                  description={item.userID}
                />
              </List.Item>
            )}
          />
        ) : (
          <></>
        ))}
    </Modal>
  );
};

export default TrainerModal;
