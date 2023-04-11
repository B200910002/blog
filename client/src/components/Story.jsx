import React, { Component } from "react";
import { Modal, Button, Row, Col, Form, Image } from "react-bootstrap";
import { Fonts } from "../constants/styles";
import { UserContext } from "../context/UserContext";

export default class Story extends Component {
  constructor(props) {
    super(props);
    this.state = { title: "",contents: "" };
  }
  static contextType = UserContext;
  render() {
    const { name } = this.context;
    const { uploadPicture, story } = this.context;
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Form onSubmit={() => story(this.state)}>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Story Information
            </Modal.Title>
          </Modal.Header>

          <Modal.Body style={Fonts.smallGray}>
              <Form.Group controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  placeholder="Title"
                  onChange={(event) =>
                    this.setState({ name: event.target.value })
                  }
                />
              </Form.Group>

            <Form.Group controlId="contents">
              <Form.Label>Body</Form.Label>
              <Form.Control
                type="text" 
                name="contents"
                as="textarea"
                placeholder="Tell your story"
                onChange={(event) => this.setState({ contents: event.target.value })}
                style={{height:500}}
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
