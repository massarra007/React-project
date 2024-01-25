import axios from "../custom/axios";
import { toast } from "react-hot-toast";

const GetCvByUser = (succ, fail) => {
  axios
    .get(`/api/cv/get_cv_by_user`)
    .then((res) => {
      succ(res.data.data);
    })
    .catch((error) => {
      console.log(error);
      fail(error.response);
    });
};
const GetCvById = (_id, succ, fail) => {
  axios
    .get(`/api/cv/get_cv_by_id/${_id}`)
    .then((res) => {
      succ(res.data.data);
    })
    .catch((error) => {
      console.log(error);
      fail(error.response);
    });
};
const UpdateCv = (data, succ, fail) => {
  try {
    let res = axios.put(`/api/cv/update`, { ...data }).then((res) => {
      succ(res);
    });
  } catch (error) {
    console.log(error);
    fail(error.response);
  }
};

export default {
  GetCvByUser,
  UpdateCv,
  GetCvById,
};
