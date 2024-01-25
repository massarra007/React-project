import axios from "../custom/axios";

const StatSociete = () => {
  //
  return axios.get(`/api/project/stats_societe`);
};

const StatTechno = () => {
  //
  return axios.get(`/api/project/stats_techno`);
};

const StatMention = () => {
  //
  return axios.get(`/api/project/stats_mention`);
};

const StatEncad = () => {
  //
  return axios.get(`/api/project/stats_encad`);
};

const StatPromo = () => {
  //
  return axios.get(`/api/project/stats_promot`);
};

const StatPie = () => {
  return axios.get(`/api/project/global_pie`);
};

const StatPays = () => {
  return axios.get(`/api/project/stats_pays`);
};

export default {
  StatSociete,
  StatTechno,
  StatMention,
  StatEncad,
  StatPromo,
  StatPie,
  StatPays,
};
