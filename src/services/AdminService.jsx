import axios from "../custom/axios";

const API_URL = "/api/admin/";
const API_URL_All = "/api/user/";

const GetAllAdmins = () => {
  return axios.get(`${API_URL}getAll`);
};
{
  /*const GetAdminById = (_id) => {
  return axios.get(`${API_URL}getOne/${_id}`);
};*/
}
const AddAdmin = (info) => {
  return axios.post(`${API_URL}create`, info);
};
const DeleteAdmin = (_id) => {
  return axios.delete(`${API_URL_All}delete/${_id}`);
};
const UpdateAdmin = (_id, info) => {
  return axios.put(`${API_URL}update_permissions/${_id}`, info);
};
export default {
  GetAllAdmins,
  AddAdmin,
  DeleteAdmin,
  UpdateAdmin,
};
