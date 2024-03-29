export const BASE_URL = `http://localhost:1000/api/v1`;
export const IMAGE_URL = `http://localhost:1000/api/v1/user/upload-pic`;
export const VIDEO_URL = `http://localhost:1000/public/video`;

export const IS_AUTHENCATED_URL = `${BASE_URL}/user/is-authencated`;
export const LOGIN_URL = `${BASE_URL}/user/login`;
export const REGISTER_URL = `${BASE_URL}/user/register`;
export const USER_URL = `${BASE_URL}/user/get-user`;
export const USER_FOLLOWERS_URL = `${BASE_URL}/user/get-followers`;
export const USER_FOLLOWING_URL = `${BASE_URL}/user/get-following`;
export const EDIT_USER_URL = `${BASE_URL}/user/edit-user`;
export const FOLLOW_URL = `${BASE_URL}/user/follow`;
export const UNFOLLOW_URL = `${BASE_URL}/user/unfollow`;
export const STORY_FROM_FOLLOWING = `${BASE_URL}/story/get-from-following`;
export const ADD_STORY = `${BASE_URL}/story/create-story`;

export const CHANGE_PASSWORD_URL = `${BASE_URL}/user/change-password`;

export const GRADE_URL = `${BASE_URL}/grade/`;

export const CONFiG = {
  headers: {
    Authorization: `Bearer ${
      JSON.parse(localStorage.getItem("user"))
        ? JSON.parse(localStorage.getItem("user")).token
        : " "
    }`,
  },
};
