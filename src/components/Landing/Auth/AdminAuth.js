import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { logInAdmin } from "../../../redux/auth-actions";

const AdminAuth = () => {
  const fakeUid = useParams().fakeUid;
  const dispatch = useDispatch();
  const [adminData, setAdminData] = useState({
    email: "",
    password: "",
  });

  const setAdminDataHandler = (event) => {
    setAdminData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const adminAuthenticationHandler = async (event) => {
    event.preventDefault();
    const response = await dispatch(
      logInAdmin(adminData.email, adminData.password, fakeUid)
    );
  };

  return (
    <form onSubmit={adminAuthenticationHandler}>
      <input
        onChange={setAdminDataHandler}
        type="text"
        id="email"
        name="email"
      />
      <input
        onChange={setAdminDataHandler}
        type="password"
        id="password"
        name="password"
      />
      <button type="submit">SUBMIT</button>
    </form>
  );
};

export default AdminAuth;
