import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import {
  ADD_STORY,
  BASE_URL,
  CONFiG,
  STORY_FROM_FOLLOWING,
} from "../constants/config";

export const StoryContext = createContext({});

export function StoryProvider(props) {
  const [stories, setStories] = useState([]);
  const [selectStory, setSelectStory] = useState({});
  const [clicked, setClicked] = useState(false);
  var click = () => (clicked === false ? setClicked(true) : setClicked(false));
  useEffect(() => {
    const getStoriesFromFollowing = async () => {
      await axios
        .get(STORY_FROM_FOLLOWING, CONFiG)
        .then((response) => {
          setStories(response.data);
        })
        .catch((e) => {
          console.log(e.response.data.error);
        });
    };
    getStoriesFromFollowing();
  }, [clicked]);

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
  const deleteStory = async (storyId) => {
    if (window.confirm("Are you sure delete story?")) {
      await axios
        .delete(`${BASE_URL}/story/delete-story/${storyId}`, CONFiG)
        .then((response) => {})
        .catch((error) => {
          console.log(error.response.data.error);
        });
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
  const deleteComment = async (storyId, commentId) => {
    if (window.confirm("Are you sure delete comment?")) {
      await axios
        .delete(
          `${BASE_URL}/story/${storyId}/delete-comment/${commentId}`,
          CONFiG
        )
        .then((response) => {})
        .catch((error) => {
          console.log(error.response.data.error);
        });
    }
  };
  return (
    <StoryContext.Provider
      value={{
        stories,
        selectStory,
        setSelectStory,
        createStory,
        like,
        comment,
        getComments,
        deleteStory,
        deleteComment,
        click,
      }}
    >
      {props.children}
    </StoryContext.Provider>
  );
}
