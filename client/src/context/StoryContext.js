import React, { createContext } from "react";
import axios from "axios";
import { ADD_STORY, CONFiG } from "../constants/config";

export const StoryContext = createContext({});

export function StoryProvider(props) {
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
  return (
    <StoryContext.Provider
      value={{
        createStory,
      }}
    >
      {props.children}
    </StoryContext.Provider>
  );
}
