import React, { useEffect, useState } from "react";
import { CustomTable, IconWrapper } from "./style";
import { Button } from "antd";
import {
  acceptRequestEquipment,
  cancelRequestEquipment,
  deleteRequestEquipment,
  getEquipment,
  getRequestEquipment,
  getRequestEquipmentByMember,
  getRequestEquipmentByTrainer,
  rejectRequestEquipment,
} from "../../actions/EquipmentAction";
import { userRoles } from "../../resources/UserRoles";

const EquipmentRequest = ({ forceRender }) => {
  const user = JSON.parse(sessionStorage.getItem("profile"));
  const columns = [
    {
      title: "ID",
      dataIndex: "element",
      render: (text, record) => {
        return record?.element?.id;
      },
    },
    {
      title: "Equipment",
      dataIndex: "equipment",
      key: "equipment",
    },
    {
      title: "Member",
      dataIndex: "member",
      render: (text, record) => {
        return user?.userRole === userRoles.MEMBER
          ? user?.fullName
          : record?.member;
      },
    },
    {
      title: "Count",
      dataIndex: "count",
      render: (text, record) => {
        return record?.element?.count;
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text, record) => {
        return record?.element?.status;
      },
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => {
        return (
          <IconWrapper>
            {user?.userRole !== userRoles.MEMBER &&
            record.element.status !== "Released" ? (
              <>
                <Button
                  onClick={() => handleAccept(record.element)}
                  style={{ background: "green" }}
                >
                  Accept
                </Button>
                <Button
                  onClick={() => handleReject(record.element)}
                  style={{ background: "orange" }}
                >
                  Reject
                </Button>
              </>
            ) : (
              record.element.status === "Accept" && (
                <Button
                  onClick={() => handleRelease(record.element)}
                  style={{ background: "blue" }}
                >
                  Release
                </Button>
              )
            )}
            {record.element.status === "Released" &&
              <Button
              onClick={() => handleDelete(record.element)}
              style={{ background: "red" }}
            >
              Delete
            </Button>
            }
          </IconWrapper>
        );
      },
    },
  ];
  const [requests, setRequests] = useState([]);
  const [rerender, setRerender] = useState(false);
  const handleFetchData = async () => {
    if (user?.userRole === userRoles.ADMIN) {
      setRequests(await getRequestEquipment());
    } else if (user?.userRole === userRoles.INSTRUCTOR) {
      setRequests(await getRequestEquipmentByTrainer(user?.userID));
    } else if (user?.userRole === userRoles.MEMBER) {
      setRequests(await getRequestEquipmentByMember(user?.userID));
    }
  };
  const handleAccept = async (record) => {
    acceptRequestEquipment(record);
    setRerender(!rerender);
  };

  const handleDelete = async (record) => {
    deleteRequestEquipment(record);
    setRerender(!rerender);
  };

  const handleReject = async (record) => {
    rejectRequestEquipment(record);
    setRerender(!rerender);
  };

  const handleRelease = async (record) => {
    cancelRequestEquipment(record);
    setRerender(!rerender);
  };

  useEffect(() => {
    handleFetchData();
    console.log('render');
  }, [forceRender, rerender]);
  return <CustomTable dataSource={requests} columns={columns} />;
};

export default EquipmentRequest;
