import React from "react";
// import { HomeContext, HomeProvider } from "../context/HomeContext";
import { Row, Col } from "react-bootstrap";
import { StoryContext, StoryProvider } from "../context/StoryContext";
import StoryFromFollowing from "../components/story/StorysFromFollowing";
import Comments from "../components/story/Comments";
import Footer from "../components/Footer"

export default function Home() {
  return (
    <StoryProvider>
      <HomeConsumer />
    </StoryProvider>
  );
}

function HomeConsumer() {
  return (
    <StoryContext.Consumer>
      {(context) => (
        <>
          <Row>
            <Col sm={8} style={{ overflowY: "scroll", height: "600px" }}>
              <div>
                <section>
                  <StoryFromFollowing />
                </section>
              </div>
            </Col>
            <Col sm={4}>
              <Comments />
            </Col>
            <Footer />
          </Row>
        </>
      )}
    </StoryContext.Consumer>
  );
}
