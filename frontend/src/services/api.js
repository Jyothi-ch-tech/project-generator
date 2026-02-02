import axios from "axios";

export const generateProject = (data) => {
  return axios.post("http://localhost:5000/api/project/generate", data);
};
