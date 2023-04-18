import React, { Component } from "react";
import { Form, FormGroup, FormControl, Button, Modal } from "react-bootstrap";
import { UserContext } from "../context/UserContext";

export default class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oldPassword: "",
      newPassword: "",
      repeatNewPassword: "",
      response: "",
    };
  }
  static contextType = UserContext;
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  handleSubmit = async (event) => {
    event.preventDefault();
    const { changePassword } = this.context;
    console.log(this.context)
    const response = await changePassword(
      this.state.oldPassword,
      this.state.newPassword,
      this.state.repeatNewPassword
    );
    this.setState({ response: response });
  };
  render() {
    const { response } = this.state;
    return (
      <Modal
        {...this.props}
        size="gl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Form onSubmit={this.handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Change Password
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormGroup>
              <Form.Label>Old Password</Form.Label>
              <FormControl
                type="password"
                id="oldPassword"
                name="oldPassword"
                value={this.state.oldPassword}
                onChange={this.handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Form.Label>New Password</Form.Label>
              <FormControl
                type="password"
                id="newPassword"
                name="newPassword"
                value={this.state.newPassword}
                onChange={this.handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Form.Label>Repeat New Password</Form.Label>
              <FormControl
                type="password"
                id="repeatNewPassword"
                name="repeatNewPassword"
                value={this.state.repeatNewPassword}
                onChange={this.handleChange}
                required
              />
            </FormGroup>
            <div>
              <br />
              {response ? (
                response.error ? (
                  <div className="alert alert-danger">{response.error}!</div>
                ) : (
                  <div className="alert alert-success">{response}!</div>
                )
              ) : (
                <></>
              )}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button color="primary" type="submit">
              Change Password
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    );
  }
}
