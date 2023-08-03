import React, { useEffect, useState } from "react";
import {
  AddButton,
  ButtonContainer,
  Container,
  CustomTable,
  IconWrapper,
} from "./style";
import {
  getMembers,
  getMembersAssignToTrainer,
  deleteMember,
} from "../../actions/AuthActions";
import { DeleteFilled, EditOutlined, EyeFilled } from "@ant-design/icons";
import MemberEdit from "./Edit/MemberEdit";
import dayjs from "dayjs";
import MemberModal from "./Modals/MemberModal";
import { userRoles } from "../../resources/UserRoles";
const Members = ({ forceRender, trainerMode }) => {
  const user = JSON.parse(sessionStorage.getItem("profile"));
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
      title: "Trainer",
      dataIndex: "instructor",
      render: (record) => {
        if (record) {
          return record?.fullName;
        } else {
          return "--";
        }
      },
    },
    {
      title: "Actions",
      dataIndex: "action",
      render: (text, record) => {
        return (
          <IconWrapper>
            <EyeFilled
              onClick={() => {
                handleViewMember(record);
              }}
              style={{ cursor: "pointer" }}
            />
            {userRoles.ADMIN === user?.userRole && (
              <EditOutlined
                onClick={() => {
                  handleEditMember(record);
                }}
                style={{ cursor: "pointer" }}
              />
            )}
            {userRoles.ADMIN === user?.userRole && (
              <DeleteFilled
                onClick={() => {
                  handleDeleteMember(record);
                }}
                style={{ cursor: "pointer" }}
              />
            )}
          </IconWrapper>
        );
      },
    },
  ];
  const [members, setMembers] = useState([]);
  const [member, setMember] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const handleEditMember = (member) => {
    member.dob = dayjs(member.dob);
    member.purpose = member.purpose.split(",");
    member.weight = member.weight + "kg";
    member.height = member.height + "cm";
    setMember(member);
    setEditMode(true);
  };

  const handleDeleteMember = (member) => {
    deleteMember(member);
    setRefresh(!refresh);
  };

  const handleViewMember = (member) => {
    setMember(member);
    setIsModalOpen(true);
  };
  const handleFetchData = async () => {
    setMembers(await getMembers());
  };
  useEffect(() => {
    if (!trainerMode) handleFetchData();
  }, [forceRender, editMode, isModalOpen, trainerMode, refresh]);

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleFetchData2 = async () => {
    setMembers(await getMembersAssignToTrainer());
  };
  useEffect(() => {
    if (trainerMode) handleFetchData2();
  }, [isModalOpen, trainerMode, forceRender]);
  return (
    <Container>
      {editMode ? (
        <>
          <ButtonContainer style={{ justifyContent: "flex-start" }}>
            <AddButton onClick={() => setEditMode(false)}>BACK</AddButton>
          </ButtonContainer>
          <MemberEdit member={member} setEditMode={setEditMode} />
        </>
      ) : (
        <CustomTable dataSource={members} columns={columns} />
      )}
      <MemberModal
        isModalOpen={isModalOpen}
        onOk={handleOk}
        member={member}
        trainerMode={trainerMode}
      />
    </Container>
  );
};

export default Members;
