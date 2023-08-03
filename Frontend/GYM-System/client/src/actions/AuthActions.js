import { notification } from "antd";
import axios from "axios";
import dayjs from "dayjs";

const API = axios.create({ baseURL: "http://localhost:5000" });

export const login = async (credentials, navigateToDashBoard) => {
  try {
    const { data } = await API.post("/api/user/login", credentials);
    if (data.success) {
      sessionStorage.setItem("user", JSON.stringify(data?.user?.userID));
      data.user.purpose = data?.user?.purpose?.split(",");
      sessionStorage.setItem("profile", JSON.stringify(data?.user));
      sessionStorage.setItem("userRole", JSON.stringify(data?.user?.userRole));
      notification.success({
        message: "Success",
        description: data?.message,
      });
      navigateToDashBoard();
    }
  } catch (error) {
    console.log(error);
    notification.error({
      message: error?.response?.data?.message,
      description: error?.response?.data?.error,
    });
  }
};

export const signUp = async (userData, navigateToLogin) => {
  try {
    userData.purpose = userData.purpose.join(", ");
    userData.userRole = "Member";

    const { data } = await API.post("/api/user/register", userData);
    if (data.success) {
      notification.success({
        message: "Success",
        description: data?.message,
      });
      navigateToLogin();
    }
  } catch (error) {
    console.log(error.response.data);
    notification.error({
      message: error?.response?.data?.message,
      description: error?.response?.data?.error,
    });
  }
};

export const getTrainers = async () => {
  try {
    const { data } = await API.get("/api/user/getallInstructors");
    if (data.success) {
      return data.users;
    } else {
      return [];
    }
  } catch (error) {
    console.log(error.response.data);
    notification.error({
      message: error?.response?.data?.message,
      description: error?.response?.data?.error,
    });
  }
};

export const getMembers = async () => {
  try {
    const { data } = await API.get("/api/user/getallMembers");
    if (data.success) {
      return data.users;
    } else {
      return [];
    }
  } catch (error) {
    console.log(error.response.data);
    notification.error({
      message: error?.response?.data?.message,
      description: error?.response?.data?.error,
    });
  }
};

export const getMembersAssignToTrainer = async () => {
  try {
    const id = JSON.parse(sessionStorage.getItem("user"));
    const { data } = await API.get(
      `/api/user/getMembersAssignToInstructor/${id}`
    );
    if (data.success) {
      return data.members;
    } else {
      return [];
    }
  } catch (error) {
    console.log(error.response.data);
    notification.error({
      message: error?.response?.data?.message,
      description: error?.response?.data?.error,
    });
  }
};

export const updateUser = async (userData) => {
  try {
    console.log(userData);
    if (userData.userRole === "Member")
      userData.purpose = userData?.purpose?.join(", ");
    userData.weight = userData?.weight?.replace(/kg$/i, "");
    userData.height = userData?.height?.replace(/cm$/i, "");
    const { data } = await API.put(
      `/api/user/updateUser/${userData.userID}`,
      userData
    );
    if (data.success) {
      notification.success({
        message: "Success",
        description: data?.message,
      });
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    notification.error({
      message: error?.response?.data?.message,
      description: error?.response?.data?.error,
    });
  }
};

export const deleteMember = async (userData) => {
  try {
    const { data } = await API.delete(
      `/api/user/deleteMemberbyId/${userData.userID}`
    );
    if (data.success) {
      notification.success({
        message: "Success",
        description: data?.message,
      });
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    notification.error({
      message: error?.response?.data?.message,
      description: error?.response?.data?.error,
    });
  }
};

export const assignTrainer = async (userID, instructorID) => {
  try {
    const { data } = await API.put(`/api/user/assignToInstructor`, {
      userID,
      instructorID,
    });
    if (data.success) {
      notification.success({
        message: "Success",
        description: data?.message,
      });
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    notification.error({
      message: error?.response?.data?.message,
      description: error?.response?.data?.error,
    });
  }
};

export const getMemberByID = async (userID) => {
  try {
    const { data } = await API.get(`/api/user/getMemberById/${userID}`);
    if (data.success) {
      return data?.member;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    notification.error({
      message: error?.response?.data?.message,
      description: error?.response?.data?.error,
    });
  }
};

export const getTrainerByID = async (userID) => {
  try {
    const { data } = await API.get(`/api/user/getInstructorById/${userID}`);
    if (data.success) {
      return data?.instructor;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    notification.error({
      message: error?.response?.data?.message,
      description: error?.response?.data?.error,
    });
  }
};

export const getUserCountForRoles = async () => {
  try {
    const { data } = await API.get(`/api/user/getUserCountForRoles`);
    if (data.success) {
      return data?.count;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    notification.error({
      message: error?.response?.data?.message,
      description: error?.response?.data?.error,
    });
  }
};

export const getNewRegistrants = async () => {
  try {
    const { data } = await API.get(`/api/user/getNewRegistrants`);
    if (data.success) {
      return data?.members;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    notification.error({
      message: error?.response?.data?.message,
      description: error?.response?.data?.error,
    });
  }
};



export const getUserCountByAge = async () => {
  try {
    const { data } = await API.get(`/api/user/getUserCountByAge`);
    if (data.success) {
      return data?.count;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    notification.error({
      message: error?.response?.data?.message,
      description: error?.response?.data?.error,
    });
  }
};
