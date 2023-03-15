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
  CONFiG,
} from "../constants/config";

export const UserContext = createContext({});

export class UserProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 0,
      isFollowing: false,
      name: "",
      photo: "",
      bio: "",
      email: "",
      followers: [],
      following: [],
    };
  }

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
      const response = await axios.get(USER_URL + `/${email}`, CONFiG);
      this.setState({
        status: response.data.status,
        isFollowing: response.data.isFollowing,
        name: response.data.user.name,
        photo: response.data.user.photo,
        bio: response.data.user.bio,
        email: response.data.user.email,
        followers: response.data.user.followers,
        following: response.data.user.following,
      });
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

  getStories = async (email) => {
    try {
      const response = await axios.get(BASE_URL + `/story/get-all/${email}`);
      return response.data;
    } catch (e) {
      console.log(e.response.data.error);
    }
  };

  render() {
    const { status, isFollowing, name, photo, bio, email, followers, following } =
      this.state;
    const {
      changePassword,
      getUser,
      getFollowers,
      getFollowing,
      uploadPicture,
      editProfile,
      follow,
      unfollow,
      getStories,
    } = this;
    return (
      <UserContext.Provider
        value={{
          status,
          isFollowing,
          name,
          photo,
          bio,
          email,
          followers,
          following,
          changePassword,
          getUser,
          getFollowers,
          getFollowing,
          uploadPicture,
          editProfile,
          follow,
          unfollow,
          getStories,
        }}
      >
        {this.props.children}
      </UserContext.Provider>
    );
  }
}
