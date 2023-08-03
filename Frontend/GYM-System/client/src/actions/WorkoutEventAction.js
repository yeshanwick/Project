import { notification } from "antd";
import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

export const addWorkoutEvents = async (userID, inputData) => {
  try {
    inputData.memberId = userID;
    const { data } = await API.post("/api/event/add", inputData);
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
    console.log(error.response.data);
    notification.error({
      message: error?.response?.data?.message,
      description: error?.response?.data?.error,
    });
  }
};

export const getWorkoutEvents = async () => {
  try {
    const { data } = await API.get("/api/event/getall");
    if (data.success) {
      return data.workoutsEvents;
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

export const updateWorkoutEvent = async (event) => {
  try {
    const { data } = await API.put(`/api/event/update/${event.id}`, event);
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
    console.log(error.response.data);
    notification.error({
      message: error?.response?.data?.message,
      description: error?.response?.data?.error,
    });
  }
};

export const getWorkoutEventsByInstructor = async () => {
  try {
    const id = JSON.parse(sessionStorage.getItem("user"));
    console.log(id);
    const { data } = await API.get(`/api/event/getByInstructorID/${id}`);
    console.log(data);
    if (data.success) {
      return data.workoutsEvents;
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



export const getWorkoutEventsByMember = async () => {
  try {
    const id = JSON.parse(sessionStorage.getItem("user"));
    console.log(id);
    const { data } = await API.get(`/api/event/getByMemberID/${id}`);
    console.log(data);
    if (data.success) {
      return data.workoutsEvents;
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



export const markAttendance = async (id, value) => {
  try {
    const { data } = await API.put(`/api/event/mark/attendance/${id}`, value);
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
    console.log(error.response.data);
    notification.error({
      message: error?.response?.data?.message,
      description: error?.response?.data?.error,
    });
  }
};