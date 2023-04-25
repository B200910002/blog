import React, { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";

export default function StoryFromFollowing() {
  const { getStories, following } = useContext(UserContext);
  const [stories, setStories] = useState([]);
  return (
    <UserContext.Consumer>{(context) => console.log()}</UserContext.Consumer>
  );
}
