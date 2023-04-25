import React, { createContext, useState } from "react";
import axios from "axios";
import {
  ADD_STORY,
  BASE_URL,
  CONFiG,
  STORY_FROM_FOLLOWING,
} from "../constants/config";

export const StoryContext = createContext({});

export function StoryProvider(props) {
  const [selectStory, setSelectStory] = useState({});
  const createStory = async (title, contents) => {
    try {
      const response = await axios.post(
        ADD_STORY,
        {
          title: title,
          contents: contents,
        },
        CONFiG
      );
      console.log("story", title, contents);
      return response.data;
    } catch (e) {
      console.log(e);
      return e.response.data;
    }
  };
  const getStoriesFromFollowing = async () => {
    try {
      const response = await axios.get(STORY_FROM_FOLLOWING, CONFiG);
      return response;
    } catch (e) {
      console.log(e.response.data.error);
    }
  };
  const like = async (storyId) => {
    try {
      await axios
        .post(`${BASE_URL}/story/${storyId}/like`, {}, CONFiG)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error.response.data.error);
        });
    } catch (e) {
      console.log(e.response.data.error);
    }
  };
  const comment = async (storyId, text) => {
    await axios
      .post(
        `${BASE_URL}/story/${storyId}/create-comment`,
        { text: text },
        CONFiG
      )
      .then((response) => {})
      .catch((error) => {
        console.log(error.response.data.error);
      });
  };
  const getComments = async (storyId) => {
    return await axios.get(
      `${BASE_URL}/story/get-comments/${storyId}/comments`
    );
  };
  return (
    <StoryContext.Provider
      value={{
        selectStory,
        setSelectStory,
        createStory,
        getStoriesFromFollowing,
        like,
        comment,
        getComments,
      }}
    >
      {props.children}
    </StoryContext.Provider>
  );
}
