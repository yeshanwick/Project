import { notification } from "antd";
import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

export const addWorkouts = async (inputData) => {
  try {
    const { data } = await API.post("/api/workout/add", inputData);
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

export const getWorkouts = async () => {
  try {
    const { data } = await API.get("/api/workout/getall");
    if (data.success) {
      return data.workouts;
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

export const updateWorkout = async (workout) => {
  try {
    const { data } = await API.put(
      `/api/workout/update/${workout.id}`,
      workout
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
    console.log(error.response.data);
    notification.error({
      message: error?.response?.data?.message,
      description: error?.response?.data?.error,
    });
  }
};

export const deleteWorkout = async (workoutData) => {
  try {
    const { data } = await API.delete(`/api/workout/delete/${workoutData.id}`);
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
