import axios from "../custom/axios";
import { toast } from "react-hot-toast";

const UpdatePassword = (data, succ, fail) => {
  var token = localStorage.getItem("isamm_token");
 // console.log(token);
  if(data.confpassword!=data.password)
  {
    toast.error("Verify password confirmation... ");
  }
  else
  {
    axios
    .put("/api/user/change_pass",data, {
      
    headers: {
      'Authorization': token,
      'Accept' : 'application/json',
      'Content-Type': 'application/json'
  }}
    )
    .then((res) => {
      toast.success("updated sucessfully...");
      console.log(res);

      succ(res.data);
    })
    .catch((error) => {
      toast.error("something went wrong...");
      console.log(error.response);
      fail(error);
    });
  }
};

export default {
  UpdatePassword,
};
