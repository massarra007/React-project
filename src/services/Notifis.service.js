import axios from "../custom/axios";

export const GetMyNotifs = () => {
  //
  return axios.get(`/api/user/notifs`);
};
