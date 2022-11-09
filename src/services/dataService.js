import axios from "axios";

// http://0.0.0.0:3005/ maakt dat ik met mijn mobile telefoon ook connectie kan maken en kan testen.
// http://localhost:3005/ is het orginele

const baseUrl = "http://0.0.0.0:3005/";

const getAll = (subset) => {
  return axios.get(baseUrl + subset + "/");
};

const create = (subset, newObject) => {
  console.log("Create: ", subset, newObject);
  return axios
    .post(`${baseUrl}${subset}`, newObject)
    .then((response) => console.log(response));
};

const update = (subset, id, newObject) => {
  console.log("Update: ", subset, id, newObject);
  return axios.put(`${baseUrl}${subset}/${id}`, newObject);
};

const remove = (subset, id) => {
  console.log("Delete: ", subset, id);
  return axios.delete(`${baseUrl}${subset}/${id}`);
};

export default {
  getAll,
  create,
  update,
  remove,
};
