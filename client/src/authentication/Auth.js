import React, { useContext } from "react";
import { Link, Outlet, Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Auth() {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <>
      {!isAuthenticated ? (
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
