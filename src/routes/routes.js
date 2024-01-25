// ------------------------- COMPONENTS --------------------------------
import Register from "../pages/auth/register/Register";
import Login from "../pages/auth/login/Login";
import Logout from "../pages/auth/logout/Logout";
import Dashboard from "../pages/dashboard/Dashboard";
import MainPage from "../pages/dashboard/MainPage/MainPage";

import ManageStudents from "../pages/dashboard/ManageStudents/ManageStudents";
import ManageTeachers from "../pages/dashboard/ManageTeachers/ManageTeachers";
import Profile from "../pages/dashboard/Profile/Profile";

// ------------------------- ICONS --------------------------------
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import SchoolIcon from "@mui/icons-material/School";
import CoPresentIcon from "@mui/icons-material/CoPresent";
import DashboardIcon from "@mui/icons-material/Dashboard";
import EventIcon from "@mui/icons-material/Event";
import BookIcon from "@mui/icons-material/Book";
import BarChartIcon from "@mui/icons-material/BarChart";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import WorkIcon from "@mui/icons-material/Work";
/* import BarChartIcon from '@mui/icons-material/BarChart';
 */ import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
// ------------------------- ROLES --------------------------------
import { roles, permissions } from "../custom/roles";
import ChangePwd from "../pages/dashboard/changerMdp/ChangerMdp";
import ManageEvents from "../pages/dashboard/ManageEvents/ManageEvents";

import DetailsEvent from "../pages/dashboard/ManageEvents/DetailsEvent";
import AcountsPage from "../pages/dashboard/AcountStudents/AcountsPage";
import EventDetail from "../pages/dashboard/MainPage/Event/EventDetail";
import CVStudent from "../pages/dashboard/ManageStudents/CVStudent";
import ManageAdmins from "../pages/dashboard/ManageAdmins/ManageAdmins";
import GestionAlumini from "../pages/dashboard/GestionAlumini/GestionAlumini";

import StudentManageMyPFE from "../pages/dashboard/Projet_Stage_PFE/StudentMyPFE/StudentManageMyPFE";
import StudentManageMyStage from "../pages/dashboard/Projet_Stage_PFE/StudentMyStage/StudentManageMyStage";
import TeacherPFA from "../pages/dashboard/Projet_Stage_PFE/TeacherPFA/StudentManageMyPFE";
import EnseigManagePFE from "../pages/dashboard/Projet_Stage_PFE/EnseigPFE/EnseigManagePFE";
import AdminManageProject from "../pages/dashboard/Projet_Stage_PFE/AdminProjects/AdminManageProject";
import StatistiquePfe from "../pages/dashboard/StatistiquePfe/StatistiquePfe";

import ResApprovePFA from "../pages/dashboard/Projet_Stage_PFE/ResponsablePFA/RespManagePFA";
import AdminPFA from "../pages/dashboard/Projet_Stage_PFE/AdminPFA/AdminPFA";
import StudentPFA from "../pages/dashboard/Projet_Stage_PFE/StudentPFA/StudentPFA";
import ManagePromotion from "../pages/dashboard/ManagePromotion/ManagePromotion";
import StatsComponent from "../pages/dashboard/stats/StatsComponent";
import RecruitmentScreen from "../pages/dashboard/Recrutement/RecruitmentScreen";
import OfferListScreen from "../pages/dashboard/Offers/OffersScreen";
import PublicOffers from "../pages/dashboard/Offers/PublicOffers";
import RecruitmentListScreen from "../pages/dashboard/Recrutement/RecruitmentListScreen";
const not_logged = {
  routes: [
    { path: "/login", route: "login", Component: Login },
    { path: "/register", route: "register", Component: Register },
  ],
  default: "/login",
};

const logged = {
  routes: [{ path: "/dash/*", route: "dash", Component: Dashboard }],
  default: "/dash/main",
};

const dashboard = {
  routes: [
    {
      main: "/dash",
      route: "main",
      path: "/main",
      Component: MainPage,
      title: "Page Principal",
      Icon: DashboardIcon,
      role: [roles.ALL],
      perm_name: permissions.all,
      in_nav: true,
    },
    {
      // back to this part ....
      main: "/dash",
      route: "event",
      path: "/event/:_id",
      Component: EventDetail,
      title: "Page Principal",
      Icon: DashboardIcon,
      role: [roles.ALL],
      perm_name: permissions.event,
      in_nav: false,
    },
    {
      main: "/dash",
      route: "profile",
      path: "/profile",
      Component: Profile,
      title: "Profil",
      Icon: AccountBoxIcon,
      role: [roles.ALL],
      perm_name: permissions.all,
      in_nav: false,
    },
    {
      main: "/dash",
      route: "ChangerPwd",
      path: "/ChangerPwd",
      Component: ChangePwd,
      title: "Changer Mot de passe",
      Icon: AccountBoxIcon,
      role: [roles.ALL],
      perm_name: permissions.all,
      in_nav: false,
    },
    {
      main: "/dash",
      route: "gest_students",
      path: "/gest_students",
      Component: ManageStudents,
      title: "Gest Etudiants",
      Icon: SchoolIcon,
      role: [roles.ADMIN, roles.SUPERADMIN, roles.TEACHER, roles.RESPONSIBLE],
      perm_name: permissions.student,
      in_nav: true,
    },
    {
      main: "/dash",
      route: "gest_students",
      path: "/gest_students/cv/:_id",
      Component: CVStudent,
      Icon: SchoolIcon,
      role: [roles.TEACHER, roles.RESPONSIBLE, roles.STUDENT, roles.ALUMINIE],
      perm_name: permissions.all,
      in_nav: false,
    },
    {
      main: "/dash",
      route: "GestionDesEnseignants",
      path: "/GestionDesEnseignants",
      Component: ManageTeachers,
      title: "Gest Enseignants",
      Icon: CoPresentIcon,
      role: [roles.ADMIN, roles.SUPERADMIN],
      perm_name: permissions.teacher,
      in_nav: true,
    },
    {
      main: "/dash",
      route: "GestionDesEvenement",
      path: "/GestionDesEvenement",
      Component: ManageEvents,
      title: "Gest Evénement",
      Icon: EventIcon,
      role: [roles.ADMIN, roles.SUPERADMIN, roles.TEACHER],
      perm_name: permissions.event,
      in_nav: true,
    },
    {
      main: "/dash",
      route: "GestionDesAdmin",
      path: "/GestionDesAdmin",
      Component: ManageAdmins,
      title: "Gest Adminstrateur",
      Icon: SupervisorAccountIcon,
      role: [roles.SUPERADMIN],
      perm_name: permissions.admin,
      in_nav: true,
    },
    {
      main: "/dash",
      route: "GestionDesEvenement",
      path: "/GestionDesEvenement/details/:_id",
      Component: DetailsEvent,
      title: "Se Déconnecter",
      Icon: MeetingRoomIcon,
      role: [roles.ADMIN, roles.SUPERADMIN],
      perm_name: permissions.event,
      in_nav: false,
    },
    {
      main: "/dash",
      path: "/student_my_pfes",
      route: "student_my_pfes",
      Component: StudentManageMyPFE,
      title: "Gest Mon PFE",
      Icon: BookIcon,
      role: [roles.STUDENT],
      perm_name: permissions.none,
      in_nav: true,
    },
    {
      main: "/dash",
      path: "/student_my_stages",
      route: "student_my_stages",
      Component: StudentManageMyStage,
      title: "Gest Mon Stage",
      Icon: BookIcon,
      role: [roles.STUDENT],
      perm_name: permissions.none,
      in_nav: true,
    },
    {
      main: "/dash",
      path: "/student_my_pfa",
      route: "student_my_pfa",
      Component: StudentPFA,
      title: "Gest Mon PFA",
      Icon: BookIcon,
      role: [roles.STUDENT],
      perm_name: permissions.none,
      in_nav: true,
    },
    {
      main: "/dash",
      path: "/approve_pfe",
      route: "approve_pfe",
      Component: EnseigManagePFE,
      title: "Approve PFE",
      Icon: BookIcon,
      role: [roles.TEACHER],
      perm_name: permissions.none,
      in_nav: true,
    },

    {
      main: "/dash",
      path: "/teacher_my_pfa",
      route: "teacher_my_pfa",
      Component: TeacherPFA,
      title: "Gest Mon PFA",
      Icon: BookIcon,
      role: [roles.TEACHER],
      perm_name: permissions.all,
      in_nav: true,
    },
    {
      main: "/dash",
      path: "/admin_projects",
      route: "admin_projects",
      Component: AdminManageProject,
      title: "Gest PFE/Stage",
      Icon: BookIcon,
      role: [roles.SUPERADMIN, roles.ADMIN],
      perm_name: permissions.PFE,
      in_nav: true,
    },
    {
      main: "/dash",
      path: "/pfe_stats",
      Component: StatistiquePfe,
      title: "Statistis PFE",
      route: "pfe_stats",
      Icon: BarChartIcon,
      role: [roles.SUPERADMIN, roles.ADMIN],
      perm_name: permissions.PFE,
      in_nav: true,
    },
    {
      main: "/dash",
      path: "/approvepfa",
      route: "approvepfa",
      Component: ResApprovePFA,
      title: "Approve PFA",
      Icon: BookIcon,
      role: [roles.RESPONSIBLE],
      perm_name: permissions.all,
      in_nav: true,
    },
    {
      main: "/dash",
      path: "/adminpfa",
      route: "adminpfa",
      Component: AdminPFA,
      title: "List PFA",
      Icon: BookIcon,
      role: [roles.ADMIN, roles.SUPERADMIN],
      perm_name: permissions.PFA,
      in_nav: true,
    },
    {
      main: "/dash",
      path: "/saisons",
      route: "saisons",
      Component: ManagePromotion,
      title: "Gest Saisons",
      Icon: CalendarMonthIcon,
      role: [roles.ADMIN, roles.SUPERADMIN],
      perm_name: permissions.saison,
      in_nav: true,
    },
    {
      main: "/dash",
      path: "/logout",
      route: "logout",
      Component: Logout,
      title: "Se Déconnecter",
      Icon: MeetingRoomIcon,
      role: [roles.ALL],
      perm_name: permissions.all,
      in_nav: false,
    },
    {
      main: "/dash",
      route: "ComptePublic",
      path: "/ComptePublic",
      Component: AcountsPage,
      title: "Compte Public",
      Icon: MeetingRoomIcon,
      role: [roles.STUDENT, roles.ALUMINIE],
      perm_name: permissions.all,
      in_nav: true,
    },
    {
      main: "/dash",
      path: "/validateAlumini",
      route: "validateAlumini",

      Component: GestionAlumini,
      title: "Gestion Alumini",
      Icon: ManageAccountsIcon,
      role: [roles.ADMIN, roles.SUPERADMIN],
      perm_name: permissions.validateAluminie,
      in_nav: true,
    },
    {
      main: "/dash",
      path: "/statAlumini",
      route: "statAlumini",

      Component: StatsComponent,
      title: "Statistiques Alumini",
      Icon: BarChartIcon,
      role: [roles.ADMIN, roles.SUPERADMIN],
      perm_name: permissions.statisticChomage,
      in_nav: true,
    },
    {
      main: "/dash",
      path: "/RecrutementForm",
      route: "RecrutementForm",

      Component: RecruitmentScreen,
      title: "Condidature",
      Icon: WorkIcon,
      role: [roles.ALUMINIE],
      perm_name: permissions.all,
      in_nav: true,
    },
    {
      main: "/dash",
      path: "/offersAlumini",
      route: "offersAlumini",

      Component: OfferListScreen,
      title: "Mes offres",
      Icon: LibraryBooksIcon,
      role: [roles.ALUMINIE],
      perm_name: permissions.all,
      in_nav: true,
    },
    {
      main: "/dash",
      path: "/publicOffers",
      route: "publicOffers",

      Component: PublicOffers,
      title: "Tout les offres",
      Icon: LibraryBooksIcon,
      role: [roles.ALL],
      perm_name: permissions.offer,
      in_nav: true,
    },
    {
      main: "/dash",
      path: "/RecrutementManage",
      route: "RecrutementManage",

      Component: RecruitmentListScreen,
      title: "Voir les recrutements",
      Icon: WorkIcon,
      role: [roles.SUPERADMIN],
      perm_name: permissions.recruitment,
      in_nav: true,
    },
  ],
  default: "/dash/main",
};

export { not_logged, logged, dashboard };
