import React, { Component } from "react";
import { Fonts } from "../constants/styles";
import { HomeContext, HomeProvider } from "../context/HomeContext";
import Story from "../components/Story";
import { Modal, Button, Row, Col, Form, Image } from "react-bootstrap";
import { StoryContext, StoryProvider } from "../context/StoryContext";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <StoryProvider>
        <HomeConsumer />
      </StoryProvider>
    );
  }
}

class HomeConsumer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  static contextType = StoryContext;
  render() {
    // const { grade } = this.context;
    const {title, contents} = this.context;
    let addStoryModalClose = () => this.setState({ addStoryModalShow: false });

    return (
      <StoryContext.Consumer>
        {(context) => (
          <>
            <div>
              <Story
                show={this.state.addStoryModalShow}
                onHide={addStoryModalClose}
                title={title}
                contents={contents}
              ></Story>

              <section>
                <p style={Fonts.largeDark}>Home</p>
                <Button
                  onClick={() => this.setState({ addStoryModalShow: true })}
                >
                  Add story
                </Button>
              </section>
            </div>
          </>
        )}
      </StoryContext.Consumer>
    );
  }
}
