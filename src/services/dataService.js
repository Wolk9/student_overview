import axios from "axios";

const baseUrl = "http://localhost:3005/";

const getAll = (subset) => {
  return axios.get(baseUrl + subset + "/");
};

const create = (subset, newObject) => {
  return axios
    .post(baseUrl + subset + "/, newObject")
    .then((response) => console.log(response));
};

const update = (subset, id, newObject) => {
  return axios.put(`${baseUrl}${subset}/${id}`, newObject);
};

export default {
  getAll,
  create,
  update,
};
