import React, { createContext, useEffect, useState } from "react";
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
  ADD_STORY,
} from "../constants/config";

export const UserContext = createContext({});

export function UserProvider(props) {
  const [status, setStatus] = useState(0);
  const [isFollowing, setIsfollowing] = useState(false);
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState("");
  const [followers, setFollower] = useState([]);
  const [following, setFollowing] = useState([]);
  const [clicked, setClicked] = useState(false);
  var click = () => (clicked === false ? setClicked(true) : setClicked(false));

  useEffect(() => {
    getUser(props.children.props.params.email);
  });

  const changePassword = async (
    oldPassword,
    newPassword,
    repeatNewPassword
  ) => {
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

  const getUser = async (email) => {
    try {
      const response = await axios.get(USER_URL + `/${email}`, CONFiG);
      setStatus(response.data.status);
      setIsfollowing(response.data.isFollowing);
      setName(response.data.user.name);
      setPhoto(response.data.user.photo);
      setBio(response.data.user.bio);
      setEmail(response.data.user.email);
      setFollower(response.data.user.followers);
      setFollowing(response.data.user.following);
    } catch (e) {
      console.log(e.response.data.error);
    }
  };

  const getFollowers = async (email) => {
    try {
      const user = await axios.get(USER_FOLLOWERS_URL + `/${email}`, CONFiG);
      return user.data;
    } catch (e) {
      console.log(e.response.data.error);
    }
  };

  const getFollowing = async (email) => {
    try {
      const user = await axios.get(USER_FOLLOWING_URL + `/${email}`, CONFiG);
      return user.data;
    } catch (e) {
      console.log(e.response.data.error);
    }
  };

  const uploadPicture = async (event) => {
    const photo = event.target.files[0];
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

  const editProfile = async (user) => {
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

  const follow = async (email) => {
    try {
      await axios.put(FOLLOW_URL + `/${email}`, {}, CONFiG).then(click);
    } catch (e) {
      console.log(e.response.data.error);
    }
  };

  const unfollow = async (email) => {
    try {
      await axios.put(UNFOLLOW_URL + `/${email}`, {}, CONFiG).then(click);
    } catch (e) {
      console.log(e.response.data.error);
    }
  };

  const createStory = async (title, contents) => {
    console.log("story", title, contents);
    try {
      const response = await axios.post(ADD_STORY, {
        title: title,
        contents: contents,
      });
      console.log("story", title, contents);
      return response.data;
    } catch (e) {
      return e.response.data;
    }
  };

  const getStories = async (email) => {
    try {
      const response = await axios.get(BASE_URL + `/story/get-all/${email}`);
      return response.data;
    } catch (e) {
      console.log(e.response.data.error);
    }
  };

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
        createStory,
        clicked,
        click,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}
