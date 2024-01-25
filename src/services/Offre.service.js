
import axios from "../custom/axios";
import { toast } from "react-hot-toast";
import { GetOnly } from "../functions/Arrays.functions";

const createOffreService= async (requestData,succ,fail) => {
    axios
       .post(`api/offer/create`, requestData)
       .then((res) => {
         console.log(res);
         //const { allAluminies } = res.data.data;
         succ(res.data.data);
        // toast.success(res.data.Message);
   
         //succ([...res.data.data, ...res2.data.data]);
       })
       .catch((error) => {
         fail(error.response.data.Message);
        // toast.error(error.response.data.Message);
       });
     };

     const updateOffreService= async (offre,requestData,succ,fail) => {
        axios
           .put(`api/offer/update/${offre}`, requestData)
           .then((res) => {
             console.log(res);
             //const { allAluminies } = res.data.data;
             succ(res.data.data);
            // toast.success(res.data.Message);
       
             //succ([...res.data.data, ...res2.data.data]);
           })
           .catch((error) => {
             fail(error.response.data.Message);
            // toast.error(error.response.data.Message);
           });
         };

     const GetAllOffersByOwner = (succ, fail) => {
        axios
          .get(`/api/offer/GetAllByIdOwner`)
          .then((res) => {
            console.log(res);
            //const { offers } = res.data.data;
            succ(res.data.data);
            //succ([...res.data.data, ...res2.data.data]);
          })
          .catch((error) => {
            fail(error.response.data.Message);
          //  toast.error(error.response.data.Message);
          });
      };

      const GetAllOffers = (succ, fail) => {
        axios
          .get(`/api/offer/getAll`)
          .then((res) => {
            console.log(res);
            //const { offers } = res.data.data;
            succ(res.data.data);
            //succ([...res.data.data, ...res2.data.data]);
          })
          .catch((error) => {
            fail(error.response.data.Message);
          //  toast.error(error.response.data.Message);
          });
      };

      const deleteOffer = (offre,succ, fail) => {
        axios
          .delete(`/api/offer/delete/${offre}`)
          .then((res) => {
            console.log(res);
            //const { offers } = res.data.data;
            succ(res);
            //succ([...res.data.data, ...res2.data.data]);
          })
          .catch((error) => {
            fail(error.response.data.Message);
            //toast.error(error);
          });
      };

     export default {
        createOffreService,
        GetAllOffersByOwner,
        updateOffreService,
        deleteOffer,
        GetAllOffers
     };