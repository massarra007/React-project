import axios from "../custom/axios";
import { toast } from "react-hot-toast";

const API_URL = "/api/teacher/";
const API_URL_All = "/api/user/";

const GetAllTeachers = () => {
  return axios.get(`${API_URL}get_all`);
};

const AddTeacher = (info) => {
  return axios.post(`${API_URL}createTeacher`, info);
};
const AddTeacherResponsible = (info) => {
  return axios.post(`${API_URL}createTeacherResponsible`, info);
};
const DeleteTeacher = (_id) => {
  return axios.delete(`${API_URL_All}delete/${_id}`);
};
const UpdateTeacher = (_id, info) => {
  console.log(info);
  return axios.put(`${API_URL}update_info/${_id}`, info);
};
export default {
  GetAllTeachers,
  AddTeacher,
  DeleteTeacher,
  UpdateTeacher,
  AddTeacherResponsible,
};
