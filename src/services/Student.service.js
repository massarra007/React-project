import axios from "../custom/axios";
import { toast } from "react-hot-toast";
import { GetOnly } from "../functions/Arrays.functions";

const GetAllStudents = (succ, fail) => {
  axios
    .get("/api/student/getall")
    .then((res) => {
      console.log(res);
      const { allpublicAluminies, allpublicStrudents } = res.data.data;
      succ([...allpublicStrudents, ...allpublicAluminies]);
      //succ([...res.data.data, ...res2.data.data]);
    })
    .catch((error) => {
      fail(error);
      toast.error(error.response.data.Message);
    });
};

const CreateStudent = (data, succ, fail) => {
  axios
    .post("/api/student/create", data)
    .then((res) => {
      console.log(res);
      toast.success("Etudiant a été créé");
      succ();
    })
    .catch((error) => {
      fail(error);
      console.log(error.response);
      toast.error(error.response.data.Message);
    });
};
const CreateMultipleStudent = (data, succ, fail) => {
  axios
    .post("/api/student/create_multiple_with_excel", data)
    .then((res) => {
      console.log(res);
      toast.success("Etudiants ont été créé");

      succ();
    })
    .catch((error) => {
      fail(error);
      console.log(error.response);
      toast.error("Etudiants deja existe");
    });
};
const UpdateStudent = (data, succ, fail) => {
  const allowedData = GetOnly(
    [
      "firstName",
      "lastName",
      "email",
      "phoneNumber",
      "birthDate",
      "sex",
      "classe",
      "niveau",
      "numero_classe",
      "promotion",
    ],
    data
  );
  axios
    .put(`/api/student/update_student/${data._id}`, allowedData)
    .then((res) => {
      console.log(res);
      toast.success("Etudiant a été modifié");
      succ();
    })
    .catch((error) => {
      fail(error);
      console.log(error.response);
      toast.error(error.response.data.Message);
    });
};

const UpdateDiplome = (data, succ, fail) => {
  const allowedData = GetOnly(["diplome", "diplomeDate"], data);
  axios
    .put(`/api/student/become_deplomated/${data._id}`, allowedData)
    .then((res) => {
      console.log(res);
      toast.success("Etudiant a été modifié");
      succ();
    })
    .catch((error) => {
      fail(error);
      console.log(error.response);
      toast.error(error.response.data.Message);
    });
};

const DeleteStudent = (_id, succ, fail) => {
  axios
    .delete(`/api/user/delete/${_id}`)
    .then((res) => {
      console.log(res);
      succ();
    })
    .catch((error) => {
      fail(error);
      console.log(error.response);
      toast.error(error.response.data.Message);
    });
};
const GetAllPublicAccount = (succ, fail) => {
  axios
    .get("/api/student/getallpublic")
    .then((res) => {
      console.log(res);
      succ(res.data.data);
    })
    .catch((error) => {
      fail(error);
      toast.error(error.response.data.Message);
    });
};

const UpdateUniverYear = (data, succ, fail) => {
  axios
    .put(`/api/student/update_year_univer`, data)
    .then((res) => {
      console.log(res);
      toast.success("Mise a des informations avec succé");
      succ(res);
    })
    .catch((error) => {
      console.log(error.response);
      toast.error(error.response.data.Message);
    });
};
export default {
  GetAllStudents,
  CreateStudent,
  DeleteStudent,
  UpdateStudent,
  UpdateDiplome,
  CreateMultipleStudent,
  GetAllPublicAccount,
  UpdateUniverYear,
};
