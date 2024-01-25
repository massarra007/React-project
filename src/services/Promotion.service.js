import axios from "../custom/axios";
import { toast } from "react-hot-toast";

const CreatePromotion = (data) => {
  return axios.post("/api/saison/create", { ...data });
};

const UpdatePromotion = (_id, data) => {
  return axios.put(`/api/saison/update/${_id}`, { ...data });
};

const GetAllPromotions = (succ, fail) => {
  axios
    .get("/api/saison/getall")
    .then((res) => {
      succ(res.data.data);
    })
    .catch((error) => {
      fail(error);
      toast.error(error.response.data.Message);
    });
};

export default {
  GetAllPromotions,
  UpdatePromotion,
  CreatePromotion,
};
