import React, { useState } from "react";
import { Fonts } from "../constants/styles";
// import { HomeContext, HomeProvider } from "../context/HomeContext";
import Story from "../components/Story";
import { Button } from "react-bootstrap";
import { StoryContext, StoryProvider } from "../context/StoryContext";

export default function Home() {
  return (
    <StoryProvider>
      <HomeConsumer />
    </StoryProvider>
  );
}

function HomeConsumer() {
  const [addStoryModalShow, setAddStoryModalShow] = useState(false);
  let addStoryModalClose = () => setAddStoryModalShow(false);
  return (
    <StoryContext.Consumer>
      {(context) => (
        <>
          <div>
            <Story show={addStoryModalShow} onHide={addStoryModalClose}></Story>

            <section>
              <p style={Fonts.largeDark}>Home</p>
              <Button onClick={() => setAddStoryModalShow(true)}>
                Add story
              </Button>
            </section>
          </div>
        </>
      )}
    </StoryContext.Consumer>
  );
}
