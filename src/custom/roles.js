import { have } from "../functions/Arrays.functions";

const roles = {
  ALL: "ALL",
  STUDENT: "STUDENT",
  ALUMINIE: "ALUMINIE",
  TEACHER: "TEACHER",
  RESPONSIBLE: "RESPONSIBLE",
  ADMIN: "ADMIN",
  SUPERADMIN: "SUPERADMIN",
};

const permissions = {
  all: "all",
  student: "student",
  teacher: "teacher",
  user: "user",
  event: "event",
  participation: "participation",
  project: "project",
  technologie: "technologie",
  cv: "cv",
  saison: "saison",
  admin: "admin",
  employement: "employement",
  recruitment: "recruitment",
  offer: "offer",
  none: "none",
  PFA: "PFA",
  PFE: "PFE",
  statisticChomage: "statisticChomage",
  validateAluminie: "validateAluminie",
};

const isAll = () => {
  return true;
};

const isSTUDENT = (user) => {
  return user?.role === roles.STUDENT;
};
const isALUMINIE = (user) => {
  return user?.role === roles.ALUMINIE;
};
const isTEACHER = (user) => {
  return user?.role === roles.TEACHER;
};
const isRESPONSIBLE = (user) => {
  return user?.role === roles.RESPONSIBLE;
};
const isADMIN = (user) => {
  return user?.role === roles.ADMIN;
};
const isSUPERADMIN = (user) => {
  return user?.role === roles.SUPERADMIN;
};

const have_access = (user, route_roles, route_perm) => {
  // user role exist in the array of roles
  if (have(route_roles, user?.role) || have(route_roles, roles.ALL)) {
    // user role is ADMIN
    if (user?.role === roles.ADMIN && route_perm !== permissions.none) {
      // so we have to check permission
      return (
        have(user?.permessions, route_perm) || route_perm === permissions.all
      );
    }
    return true;
  }
  return false;
};

export {
  roles,
  permissions,
  have_access,
  isAll,
  isSTUDENT,
  isALUMINIE,
  isTEACHER,
  isRESPONSIBLE,
  isADMIN,
  isSUPERADMIN,
};
