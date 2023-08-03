import React, { useEffect, useState } from "react";
import {
  AddButton,
  ButtonContainer,
  Container,
  CustomTable,
  IconWrapper,
} from "./style";
import { getTrainers, deleteMember } from "../../actions/AuthActions";
import { DeleteFilled, EditOutlined, EyeFilled } from "@ant-design/icons";
import dayjs from "dayjs";
import TrainerEdit from "./Edit/TrainerEdit";
import TrainerModal from "./Modals/TrainerModal";
const Trainers = ({ forceRender }) => {
  const columns = [
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Branch",
      dataIndex: "branch",
      key: "branch",
    },
    {
      title: "NIC",
      dataIndex: "nic",
      key: "nic",
    },
    {
      title: "Members Count",
      dataIndex: "memberCount",
      render: (text, record) => {
        return record?.members?.length;
      },
    },
    {
      title: "Specialty",
      dataIndex: "specialty",
      key: "specialty",
    },
    {
      title: "Actions",
      dataIndex: "action",
      render: (text, record) => {
        return (
          <IconWrapper>
            <EyeFilled
              onClick={() => {
                handleViewTrainer(record);
              }}
              style={{ cursor: "pointer" }}
            />
            <EditOutlined
              onClick={() => {
                handleEditTrainer(record);
              }}
              style={{ cursor: "pointer" }}
            />
            <DeleteFilled
              onClick={() => {
                handledeleteatrainer(record);
              }}
              style={{ cursor: "pointer" }}
            />
          </IconWrapper>
        );
      },
    },
  ];
  const [trainers, setTrainers] = useState([]);
  const [trainer, setTrainer] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const handleEditTrainer = (trainer) => {
    trainer.dob = dayjs(trainer.dob);
    trainer.weight = trainer.weight + "kg";
    trainer.height = trainer.height + "cm";
    setTrainer(trainer);
    setEditMode(true);
  };

  const handledeleteatrainer = (trainer) => {
    console.log(trainer);
    deleteMember(trainer);
    setRefresh(true);
  };

  const handleFetchData = async () => {
    setTrainers(await getTrainers());
  };
  const handleViewTrainer = (trainer) => {
    setTrainer(trainer);
    setIsModalOpen(true);
  };

  useEffect(() => {
    handleFetchData();
  }, [forceRender, editMode, refresh]);
  const handleOk = () => {
    setIsModalOpen(false);
  };
  return (
    <Container>
      {editMode ? (
        <>
          <ButtonContainer style={{ justifyContent: "flex-start" }}>
            <AddButton onClick={() => setEditMode(false)}>BACK</AddButton>
          </ButtonContainer>
          <TrainerEdit trainer={trainer} setEditMode={setEditMode} />
        </>
      ) : (
        <CustomTable dataSource={trainers} columns={columns} />
      )}
      <TrainerModal
        isModalOpen={isModalOpen}
        onOk={handleOk}
        trainer={trainer}
      />
    </Container>
  );
};

export default Trainers;
