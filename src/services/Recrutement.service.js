import axios from "../custom/axios";
import { toast } from "react-hot-toast";
import { GetOnly } from "../functions/Arrays.functions";


 const createRecruitmentRequest = async (requestData,succ,fail) => {
 axios
    .post(`api/recruitment/create`, requestData)
    .then((res) => {
      console.log(res);
      //const { allAluminies } = res.data.data;
      succ(res.data.data);
      toast.success(res.data.Message);

      //succ([...res.data.data, ...res2.data.data]);
    })
    .catch((error) => {
      fail(error);
      toast.error(error.response.data.Message);
    });
  };


  const GetAllRecrutement = (succ, fail) => {
    axios
      .get(`/api/recruitment/GetAll`)
      .then((res) => {
        console.log(res);
        succ(res.data.data);
      })
      .catch((error) => {
        fail(error.response.data.Message);
      });
  };
  export default {
    createRecruitmentRequest,
    GetAllRecrutement
  };