import React, { useContext } from "react";
import { Link, Outlet, Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Auth() {
  const { user } = useContext(AuthContext);
  const isAuth = user ? user.token : undefined;
  return (
    <>
      {!isAuth ? (
        <div className="login">
          <h2>
            {/* <Link to="login">Login</Link> */}
            <br />
          </h2>
          <Outlet />
        </div>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
}
