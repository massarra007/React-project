import axios from "../custom/axios";
import { toast } from "react-hot-toast";

const UpdateGeneral = (data, succ) => {
  console.log(data);
  try {
    axios.put(`/api/user/update_general`, { ...data }).then((res) => {
      succ(res);
    });
  } catch (error) {
    console.log(error);
  }
};

// update email
const UpdateEmail = (data, succ) => {
  try {
    axios.put(`/api/user/change_mail`, { email: data }).then((res) => {
      succ(res);
    });
  } catch (error) {
    console.log(error);
  }
};

const UpdateStateAccount = (succ) => {
  try {
    axios.put(`/api/user/pub_priv`).then((res) => {
      toast.success("Etat Compte Modifier Avec Succé");

      succ(res);
    });
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.Message);
  }
};

export default {
  UpdateGeneral,
  UpdateEmail,
  UpdateStateAccount,
};
