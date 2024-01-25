import axios from "../custom/axios";

const API_URL = "/api/event/";

const GetAllEvents = (saison = "") => {
  return axios.get(`${API_URL}getAll?saison=${saison}`);
};

const GetEventById = (_id) => {
  return axios.get(`${API_URL}getOne/${_id}`);
};
const AddEvent = (info) => {
  return axios.post(`${API_URL}create`, info);
};
const DeleteEvent = (_id) => {
  return axios.delete(`${API_URL}delete/${_id}`);
};
const UpdateEvent = (_id, info) => {
  console.log(info);
  return axios.put(`${API_URL}update/${_id}`, info);
};
export default {
  GetAllEvents,
  AddEvent,
  DeleteEvent,
  UpdateEvent,
  GetEventById,
};
