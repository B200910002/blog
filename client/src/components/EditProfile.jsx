  import React, { Component } from "react";
  import { Modal, Button, Row, Col, Form, Image } from "react-bootstrap";
  import { Fonts } from "../constants/styles";
  import { UserContext } from "../context/UserContext";

  export default class EditProfile extends Component {
    constructor(props) {
      super(props);
      this.state = { name: "", photo: "", bio: "" };
    }
    static contextType = UserContext;
    render() {
      const { name } = this.context;
      const { uploadPicture, editProfile } = this.context;
      return (
        <Modal
          {...this.props}
          size="gl"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Form onSubmit={() => editProfile(this.state)}>
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
                      src={this.state.photo ? this.state.photo : this.props.photo}
                    />
                  </Col>
                  <Col>
                    <Form.Control
                      type="file"
                      name="picture"
                      placeholder="picture"
                      onChange={async (event) => {
                        let pic = await uploadPicture(event);
                        this.setState({ photo: pic });
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
                    value={name}
                    onChange={(event) =>
                      this.setState({ name: event.target.value })
                    }
                  />
                </Form.Group>

              <Form.Group controlId="bio">
                <Form.Label>bio</Form.Label>
                <Form.Control
                  type="text"
                  name="bio"
                  placeholder="bio"
                  onChange={(event) => this.setState({ bio: event.target.value })}
                />
              </Form.Group>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="primary" type="submit" onClick={this.props.onHide}>
                Save
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      );
    }
  }
