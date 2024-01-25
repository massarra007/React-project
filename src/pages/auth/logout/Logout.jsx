import React, { useContext, useEffect } from "react";
import { UserContext } from "../../../store/Contexts";

function Logout() {
  const { setUser } = useContext(UserContext);
  useEffect(() => {
    setUser(null);
    localStorage.removeItem("isamm_token");
    localStorage.removeItem("isamm_ref_token");
  }, []);
  return <div></div>;
}

export default Logout;
