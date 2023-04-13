import React, { Component, createContext } from "react";
import axios from "axios";
import {
  ADD_STORY,
  CONFiG
} from "../constants/config";

export const StoryContext = createContext({});

export class StoryProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      contents: []
    };
  }

  createStory = async(title, contents) =>{
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
      console.log(e)
      return e.response.data;
    }
  }
  
  render() {
    const { title, contents } =
      this.state;
    const {
      createStory
    } = this;
    return (
      <StoryContext.Provider
        value={{
          title,
          contents,
          createStory
        }}
      >
        {this.props.children}
      </StoryContext.Provider>
    );
  }

}