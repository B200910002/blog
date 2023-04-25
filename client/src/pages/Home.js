import React, { useState } from "react";
import { Fonts } from "../constants/styles";
// import { HomeContext, HomeProvider } from "../context/HomeContext";
import Story from "../components/Story";
import { Button, Row, Col } from "react-bootstrap";
import { StoryContext, StoryProvider } from "../context/StoryContext";
import StoryFromFollowing from "../components/story/StorysFromFollowing";

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
          <Story show={addStoryModalShow} onHide={addStoryModalClose}></Story>
          <Row>
            <Col sm={8} style={{ overflowY: "scroll", height: "500px" }}>
              <div>
                <section>
                  <StoryFromFollowing />
                </section>
              </div>
            </Col>
            <Col sm={4}>
              <section>
                <p style={Fonts.largeDark}>Home</p>
                <Button onClick={() => setAddStoryModalShow(true)}>
                  Add story
                </Button>
              </section>
            </Col>
          </Row>
        </>
      )}
    </StoryContext.Consumer>
  );
}
