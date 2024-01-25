import axios from "../custom/axios";
import { toast } from "react-hot-toast";

const GetUserByToken = (succ, fail) => {
  axios
    .get("/api/user/get_user_by_token")
    .then((res) => {
      const { data, Message } = res.data;
      toast.success(Message);
      console.log(res);
      succ(data);
    })
    .catch((error) => {
      fail(error);
      console.log(error);
    });
};

const Login = (data, succ, fail) => {
  axios
    .post("/api/user/login", { ...data })
    .then((res) => {
      console.log(JSON.stringify(res));
      const { user, token, refreshToken } = res.data.data;
      console.log(res);
      if (
        user != null &&
        user.role == "ALUMINIE" &&
        (user.isValide == null || user.isValide == false)
      ) {
        //console.log("failed alumnini validation");
        fail("ALUMINI_INVALIDE");
      } else {
        toast.success(res.data.Message);
        localStorage.setItem("isamm_token", token);
        localStorage.setItem("isamm_ref_token", refreshToken);
        succ(user);
      }
    })
    .catch((error) => {
      console.log(error);
      toast.error(error.response.data.Message);
      fail(error);
    });
};

const RegisterAluminie = (data, succ, fail) => {
  axios
    .post("/api/student/register_aluminie", { ...data })
    .then((res) => {
      toast.success("success register...");
      succ(res.data);
    })
    .catch((error) => {
      toast.error(error.response.data.Message);
      console.log(error.response.data.Message);
      fail(error);
    });
};

export default {
  Login,
  GetUserByToken,
  RegisterAluminie,
};
