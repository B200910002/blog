import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import {
  CONFiG,
  LOGIN_URL,
  IS_AUTHENCATED_URL,
  REGISTER_URL,
} from "../constants/config";
import Spinner from "react-bootstrap/Spinner";

export const AuthContext = createContext({});

export function AuthProvider(props) {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const isAuth = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      setUser(user);
      await axios
        .get(IS_AUTHENCATED_URL, CONFiG)
        .then((response) => {
          setIsAuthenticated(response.data.isAuthenticated);
        })
        .catch((e) => {
          console.log(e.response.data.error);
        });
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    };

    isAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post(LOGIN_URL, {
        email: email,
        password: password,
      });
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
        window.location.href = "/";
        return "Login successfully";
      } else {
        alert("Please check your email and password");
      }
    } catch (e) {
      return e.response.data;
    }
  };

  const logout = async () => {
    localStorage.removeItem("user");
    window.location.href = "/auth/login";
    try {
    } catch (e) {
      console.log(e.message);
    }
  };

  const register = async (fname, email, password, repeatPassword) => {
    try {
      const response = await axios.post(REGISTER_URL, {
        name: fname,
        email: email,
        password: password,
        repeatPassword: repeatPassword,
      });
      return response.data;
    } catch (e) {
      return e.response.data;
    }
  };

  if (isLoading)
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    );

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, logout, register }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
