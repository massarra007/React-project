import axios from "../custom/axios";
import { toast } from "react-hot-toast";
import { GetOnly } from "../functions/Arrays.functions";

const GetAllAlumini = (succ, fail) => {
  axios
    .get("/api/student/getAllAluminies")
    .then((res) => {
      console.log(res);
      const { allAluminies } = res.data.data;
      succ(allAluminies);
      //succ([...res.data.data, ...res2.data.data]);
    })
    .catch((error) => {
      fail(error);
      toast.error(error.response.data.Message);
    });
};

const validateAluminiInscription = (idAlumini, validated, succ, fail) => {
  axios
    .put(`/api/student/validateAlumini`, 
    { idAlumini : idAlumini,
       validated:validated })
    .then((res) => {
      console.log(res);
      toast.success(res.data.Message);

      // Perform any necessary operations with the response data
      succ(res.data); // Pass the response data to the success callback
    })
    .catch((error) => {
      fail(error);
      toast.error(error.response.data.Message);
    });
};


const getAluminiStats = (critere, succ, fail) => {
  axios
    .get(`/api/employement/getAluminiStats/${critere}`)
    .then((res) => {
      toast.success(res.data.Message);

      // Perform any necessary operations with the response data
      succ(res.data.data); // Pass the response data to the success callback
    })
    .catch((error) => {
      //fail(error);
      console.log("\n exception "+error);
     // toast.error(error.message);
    });
};

const getAluminiChommageStats = (critere, succ, fail) => {
  axios
    .get(`/api/employement/getStatChommage/${critere}`)
    .then((res) => {
      toast.success(res.data.Message);

      // Perform any necessary operations with the response data
      succ(res.data.data); // Pass the response data to the success callback
    })
    .catch((error) => {
      //fail(error);
      console.log("\n exception "+error);
      toast.error(error.message);
    });
};



export default {
    GetAllAlumini,
    validateAluminiInscription,
    getAluminiStats,
    getAluminiChommageStats
};
