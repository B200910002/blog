import React, { Component, createContext } from "react";
import axios from "axios";
import {
  LOGIN_URL,
  REGISTER_URL,
  CHANGE_PASSWORD_URL,
  USER_URL,
  EDIT_USER_URL,
  BASE_URL,
  FOLLOW_URL,
  UNFOLLOW_URL,
  USER_FOLLOWERS_URL,
  USER_FOLLOWING_URL,
  CONFiG,
} from "../constants/config";

export const AuthContext = createContext({});

export class AuthProvider extends Component {
  constructor(props) {
    super(props);
    this.state = { user: {} };
  }

  componentDidMount = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    this.setState({ user: user });
  };

  login = async (email, password) => {
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

  logout = async () => {
    localStorage.removeItem("user");
    window.location.href = "/auth/login";
    try {
    } catch (e) {
      console.log(e.message);
    }
  };

  register = async (email, password, repeatPassword) => {
    try {
      const response = await axios.post(REGISTER_URL, {
        email: email,
        password: password,
        repeatPassword: repeatPassword,
      });
      return response.data;
    } catch (e) {
      return e.response.data;
    }
  };

  changePassword = async (oldPassword, newPassword, repeatNewPassword) => {
    try {
      const response = await axios.patch(
        CHANGE_PASSWORD_URL,
        {
          oldPassword: oldPassword,
          newPassword: newPassword,
          repeatNewPassword: repeatNewPassword,
        },
        CONFiG
      );
      return response.data;
    } catch (e) {
      console.log(e.response.data.error);
      return e.response.data;
    }
  };

  getUser = async (email) => {
    try {
      const user = await axios.get(USER_URL + `/${email}`, CONFiG);
      return user.data;
    } catch (e) {
      console.log(e.response.data.error);
    }
  };

  getFollowers = async (email) => {
    try {
      const user = await axios.get(USER_FOLLOWERS_URL + `/${email}`, CONFiG);
      return user.data;
    } catch (e) {
      console.log(e.response.data.error);
    }
  };

  getFollowing = async (email) => {
    try {
      const user = await axios.get(USER_FOLLOWING_URL + `/${email}`, CONFiG);
      return user.data;
    } catch (e) {
      console.log(e.response.data.error);
    }
  };

  uploadPicture = async (event) => {
    const photo = event.target.files[0];
    this.photofilename = photo.name;
    var formPhoto = new FormData();
    formPhoto.append("photo", photo);
    let result = "";
    await axios
      .post(BASE_URL + "/user/upload-picture", formPhoto)
      .then((response) => {
        result = response.data;
      });
    return result;
  };

  editProfile = async (user) => {
    console.log("pezda");
    try {
      await axios.put(
        EDIT_USER_URL,
        {
          name: user.name,
          photo: user.photo,
          bio: user.bio,
        },
        CONFiG
      );
    } catch (e) {
      console.log(e.response.data.error);
    }
  };

  follow = async (email) => {
    try {
      await axios.put(FOLLOW_URL + `/${email}`, {}, CONFiG);
    } catch (e) {
      console.log(e.response.data.error);
    }
  };

  unfollow = async (email) => {
    try {
      await axios.put(UNFOLLOW_URL + `/${email}`, {}, CONFiG);
    } catch (e) {
      console.log(e.response.data.error);
    }
  };

  render() {
    const { user } = this.state;
    const {
      login,
      logout,
      register,
      changePassword,
      getUser,
      getFollowers,
      getFollowing,
      uploadPicture,
      editProfile,
      follow,
      unfollow,
    } = this;
    return (
      <AuthContext.Provider
        value={{
          user,
          login,
          logout,
          register,
          changePassword,
          getUser,
          getFollowers,
          getFollowing,
          uploadPicture,
          editProfile,
          follow,
          unfollow,
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}
