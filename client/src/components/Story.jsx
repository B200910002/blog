import React, { Component } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Fonts } from "../constants/styles";
import { StoryContext } from "../context/StoryContext";
import { UserContext } from "../context/UserContext";

export default class Story extends Component {
  constructor(props) {
    super(props);
    this.state = { title: "", contents: [{subTitle: '', texts: ''}] };
  }
  static contextType = StoryContext;
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  handleSubmit = async (event) => {
    event.preventDefault();
    const { createStory } = this.context;
    console.log(this.context)
    await createStory(
      this.state.title,
      this.state.contents
    );
  };
  render() {
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Form onSubmit={this.handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Story Bichih
            </Modal.Title>
          </Modal.Header>

          <Modal.Body style={Fonts.smallGray}>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                placeholder="Title"

                value={this.state.title}

                onChange={this.handleChange}

              />
            </Form.Group>

            <Form.Group controlId="contents">
              <Form.Label>Body</Form.Label>
              <Form.Control
                type="text"
                name="contents"
                as="textarea"
                placeholder="Tell your story"
                onChange={this.handleChange}
                style={{ height: 500 }}
              />
            </Form.Group>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="primary" type="submit" onClick={this.props.onHide}>
              Publish
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    );
  }
}
