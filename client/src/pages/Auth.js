import React, { Component } from "react";
import { Link, Outlet, Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default class Auth extends Component {
  static contextType = AuthContext;
  render() {
    const { user } = this.context;
    const isAuth = user ? user.token : undefined;
    return (
      <>
        {!isAuth ? (
          <div className="login">
            <h2>
              <Link to="login">Login</Link>
              {" / "}
              <Link to="register">Register</Link>
            </h2>
            <Outlet />
          </div>
        ) : (
          <Navigate to="/" />
        )}
      </>
    );
  }
}
