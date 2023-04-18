import React, { useContext, useState } from "react";
import { Modal, Button, Row, Col, Form, Image } from "react-bootstrap";
import { Fonts } from "../constants/styles";
import { UserContext } from "../context/UserContext";

export default function EditProfile(props) {
  const { uploadPicture, editProfile } = useContext(UserContext);
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const [bio, setBio] = useState("");

  return (
    <Modal
      {...props}
      size="gl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Form
        onSubmit={() => editProfile({ name: name, photo: photo, bio: bio })}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Profile Information
          </Modal.Title>
        </Modal.Header>

        <Modal.Body style={Fonts.smallGray}>
          <Form.Group controlId="picture">
            <Row>
              <Col sm={3}>
                <Image
                  width="100px"
                  style={{ borderRadius: "50px" }}
                  src={photo ? photo : props.photo}
                />
              </Col>
              <Col>
                <Form.Control
                  type="file"
                  name="picture"
                  placeholder="picture"
                  onChange={async (event) => {
                    let pic = await uploadPicture(event);
                    setPhoto(pic);
                  }}
                />
              </Col>
            </Row>
          </Form.Group>

          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="name"
              defaultValue={props.name}
              onChange={(event) => setName(event.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="bio">
            <Form.Label>bio</Form.Label>
            <Form.Control
              type="text"
              name="bio"
              placeholder="bio"
              defaultValue={props.bio}
              onChange={(event) => setBio(event.target.value)}
            />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary" type="submit" onClick={props.onHide}>
            Save
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
