import { notification } from "antd";
import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

export const addEquipment = async (inputData) => {
  try {
    const { data } = await API.post("/api/equipment/add", inputData);
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

export const getEquipment = async () => {
  try {
    const { data } = await API.get("/api/equipment/getall");
    if (data.success) {
      return data.equipments;
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

export const updateEquipment = async (equipment) => {
  try {
    const { data } = await API.put(
      `/api/equipment/update/${equipment.id}`,
      equipment
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

export const getAvailableEquipment = async () => {
  try {
    const { data } = await API.get("/api/equipment/available/getall");
    if (data.success) {
      return data.equipments;
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

export const requestEquipment = async (inputData, equipmentId) => {
  try {
    inputData.equipmentId = equipmentId;
    const { data } = await API.post("/api/request/add", inputData);
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

export const getRequestEquipment = async () => {
  try {
    const { data } = await API.get("/api/request/getall");
    if (data.success) {
      console.log(data);
      return data.requests;
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

export const getRequestEquipmentByTrainer = async (userID) => {
  try {
    const { data } = await API.get(`/api/request/getallByTrainer/${userID}`);
    if (data.success) {
      console.log(data);
      return data.requests;
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

export const getRequestEquipmentByMember = async (userID) => {
  try {
    const { data } = await API.get(`/api/request/getallByMember/${userID}`);
    if (data.success) {
      console.log(data);
      return data.requests;
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

export const rejectRequestEquipment = async (request) => {
  try {
    request.status = "Reject";
    const { data } = await API.put("/api/request/reject", request);
    if (data.success) {
      notification.success({
        message: "Success",
        description: "Requests Reject Successfully.",
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

export const acceptRequestEquipment = async (request) => {
  try {
    request.status = "Accept";
    const { data } = await API.put("/api/request/accept", request);
    if (data.success) {
      notification.success({
        message: "Success",
        description: "Requests Accept Successfully.",
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

export const deleteEquipment = async (equipmentData) => {
  try {
    const { data } = await API.delete(
      `/api/equipment/delete/${equipmentData.id}`
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


export const cancelRequestEquipment = async (request) => {
  try {
    request.status = "Released";
    const { data } = await API.put("/api/request/cancel", request);
    if (data.success) {
      notification.success({
        message: "Success",
        description: "Equipment Released Successfully.",
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

export const deleteRequestEquipment = async (request) => {
  try {
    const { data } = await API.delete(`/api/request/delete/${request.id}`);
    if (data.success) {
      notification.success({
        message: "Success",
        description: "Equipment Deleted Successfully.",
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