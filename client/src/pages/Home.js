import React from "react";
// import { HomeContext, HomeProvider } from "../context/HomeContext";
import { Row, Col } from "react-bootstrap";
import { StoryContext, StoryProvider } from "../context/StoryContext";
import StoryFromFollowing from "../components/story/StorysFromFollowing";
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
{/* <<<<<<< HEAD */}
              {/* <Comments /> */}
               {/* <Footer /> */}
=======
              {/* <Comments /> */}
{/* >>>>>>> origin/zmaver1 */}
            </Col>
            <Footer />
          </Row>
        </>
      )}
    </StoryContext.Consumer>
  );
}
