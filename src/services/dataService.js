import axios from "axios";


// https://0.0.0.0:3005/ maakt dat ik met mijn mobile telefoon ook connectie kan maken en kan testen.
// https://localhost:3005/ is het orginele
const baseUrl = "http://0.0.0.0:3005/";

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
