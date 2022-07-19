import axios from "axios";

const baseUrl = "http://localhost:3005/";
const subset = "students";

const getAll = () => {
  return axios.get(baseUrl + subset + "/");
};

const create = (newObject) => {
  return axios.post(baseUrl + subset + "/, newObject");
};

const update = (id, newObject) => {
  return axios.put(`${baseUrl}${subset}/${id}`, newObject);
};

export default {
  getAllStudents: getAll,
  createStudent: create,
  updateStudent: update,
};
