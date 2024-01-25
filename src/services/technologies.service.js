import axios from "../custom/axios";
import { GetOnly } from "../functions/Arrays.functions";

const GetTechs = () => {
  return axios.get(`/api/technologie/getAll`);
};

export default {
  GetTechs,
};
