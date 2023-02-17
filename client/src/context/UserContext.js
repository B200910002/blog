import React, { Component, createContext } from "react";
import axios from "axios";
import {
  CHANGE_PASSWORD_URL,
  USER_URL,
  EDIT_USER_URL,
  BASE_URL,
  FOLLOW_URL,
  UNFOLLOW_URL,
  USER_FOLLOWERS_URL,
  USER_FOLLOWING_URL,
} from "../constants/config";

export const UserContext = createContext({});

export class UserProvider extends Component {
  constructor(props) {
    super(props);
    this.state = { user: {} };
  }

  changePassword = async (oldPassword, newPassword, repeatNewPassword) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("user")).token
          }`,
        },
      };
      const response = await axios.patch(
        CHANGE_PASSWORD_URL,
        {
          oldPassword: oldPassword,
          newPassword: newPassword,
          repeatNewPassword: repeatNewPassword,
        },
        config
      );
      return response.data;
    } catch (e) {
      console.log(e.response.data.error);
      return e.response.data;
    }
  };

  getUser = async (email) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("user")).token
          }`,
        },
      };
      const user = await axios.get(USER_URL + `/${email}`, config);
      return user.data;
    } catch (e) {
      console.log(e.response.data.error);
    }
  };

  getFollowers = async (email) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("user")).token
          }`,
        },
      };
      const user = await axios.get(USER_FOLLOWERS_URL + `/${email}`, config);
      return user.data;
    } catch (e) {
      console.log(e.response.data.error);
    }
  };

  getFollowing = async (email) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("user")).token
          }`,
        },
      };
      const user = await axios.get(USER_FOLLOWING_URL + `/${email}`, config);
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
      const config = {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("user")).token
          }`,
        },
      };
      await axios.put(
        EDIT_USER_URL,
        {
          name: user.name,
          photo: user.photo,
          bio: user.bio,
        },
        config
      );
    } catch (e) {
      console.log(e.response.data.error);
    }
  };

  follow = async (email) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("user")).token
          }`,
        },
      };
      await axios.put(FOLLOW_URL + `/${email}`, {}, config);
    } catch (e) {
      console.log(e.response.data.error);
    }
  };

  unfollow = async (email) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("user")).token
          }`,
        },
      };
      await axios.put(UNFOLLOW_URL + `/${email}`, {}, config);
    } catch (e) {
      console.log(e.response.data.error);
    }
  };

  render() {
    const { user } = this.state;
    const {
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
      <UserContext.Provider
        value={{
          user,
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
      </UserContext.Provider>
    );
  }
}
