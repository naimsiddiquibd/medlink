import { useState } from "react";
import { gqlquery, QUERY_LISTPROFILES } from "../api/index";

const useUserState = () => {
  const [user, setUser] = useState({});

  const getUserProfile = () => {
    gqlquery(QUERY_LISTPROFILES, null)
      .then((res) => res.json())
      .then((datas) => {
        if (datas?.data?.getProfile?.name) {
          setUser(datas?.data?.getProfile);
        }
      })
      .finally((e) => {
        // console.log("executed");
      });
  };

  const logOut = () => {
    sessionStorage.clear();
    setUser(null);
  }

  return {
    getUserProfile,
    user,
    logOut
  };
};

export default useUserState;
