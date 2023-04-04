import React, { Component } from "react";
import { Fonts } from "../constants/styles";
import { HomeContext, HomeProvider } from "../context/HomeContext";
import Story from "../components/Story";
import { Modal, Button, Row, Col, Form, Image } from "react-bootstrap";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <HomeProvider>
        <HomeConsumer />
      </HomeProvider>
    );
  }
}

class HomeConsumer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  static contextType = HomeContext;
  render() {
    // const { grade } = this.context;
    const {photo, title, body} = this.context;
    let addStoryModalClose = () => this.setState({ addStoryModalShow: false });

    return (
      <HomeContext.Consumer>
        {(context) => (
          <>
            <div>
              <Story
                show={this.state.addStoryModalShow}
                onHide={addStoryModalClose}
                photo={photo}
                title={title}
                body={body}
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
      </HomeContext.Consumer>
    );
  }
}
