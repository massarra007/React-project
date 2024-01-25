import axios from "../custom/axios";

const API_URL = "/api/participation/";

const getAllConfirmed = (_id) => {
  return axios.get(`${API_URL}getAllConfirmed/${_id}`);
};

const AddParticipation = (_id) => {
  return axios.post(`${API_URL}create/${_id}`);
};

const updateConfirmation = (_id, info) => {
  return axios.put(`${API_URL}updateConfirmation/${_id}`, info);
};
export default {
  getAllConfirmed,
  AddParticipation,
  updateConfirmation,
};
