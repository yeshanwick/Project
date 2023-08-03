import { notification } from "antd";
import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

export const downloadPDF = async () => {
  try {
    const {data} = API.get('/api/user/download-pdf', {
        responseType: 'blob',
      });
      console.log(data);
   
  } catch (error) {
    console.log(error);
    notification.error({
      message: error?.response?.data?.message,
      description: error?.response?.data?.error,
    });
  }
};
