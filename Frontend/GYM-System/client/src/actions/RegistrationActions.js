import { notification } from "antd";
import axios from "axios";
import { userRoles } from "../resources/UserRoles";

const API = axios.create({ baseURL: "http://localhost:5000" });

export const registerUsers = async (userData, userRole) => {
  try {
    userData.dob = userData.dob.toString();
    userData.weight = userData?.weight?.replace(/kg$/i, "");
    userData.height = userData?.height?.replace(/cm$/i, "");
    if (userRole === userRoles.MEMBER)
      userData.purpose = userData.purpose.join(", ");
    userData.userRole = userRole;

    const { data } = await API.post("/api/user/register", userData);
    if (data.success) {
      notification.success({
        message: "Success",
        description: data?.message,
      });
    }
  } catch (error) {
    console.log(error.response.data);
    notification.error({
      message: error?.response?.data?.message,
      description: error?.response?.data?.error,
    });
  }
};
