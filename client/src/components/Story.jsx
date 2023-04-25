import React, { useContext, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Fonts } from "../constants/styles";
import { StoryContext } from "../context/StoryContext";
import { UserContext } from "../context/UserContext";

export default function Story(props) {
  const { createStory } = useContext(UserContext);
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState([]);
  const handleSubmit = async (event) => {
    event.preventDefault();
    await createStory(title, contents);
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Form onSubmit={handleSubmit}>
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
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="contents">
            <Form.Label>Body</Form.Label>
            <Form.Control
              type="text"
              name="contents"
              as="textarea"
              placeholder="Tell your story"
              onChange={(event) =>
                setContents([{ subTitle: "", texts: [event.target.value] }])
              }
              style={{ height: 200 }}
              required
            />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary" type="submit" onClick={props.onHide}>
            Publish
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
