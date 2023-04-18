import React, { useState, useContext } from "react";
import { Form, FormGroup, FormControl, Button, Modal } from "react-bootstrap";
import { UserContext } from "../context/UserContext";

export default function ChangePassword(props) {
  const { changePassword } = useContext(UserContext);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [reNewPassword, setReNewPassword] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await changePassword(
      oldPassword,
      newPassword,
      reNewPassword
    );
    setResponse(response);
  };

  return (
    <Modal
      {...props}
      size="gl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Form onSubmit={handleSubmit}>
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
              value={oldPassword}
              onChange={(event) => setOldPassword(event.target.value)}
              required
            />
          </FormGroup>
          <FormGroup>
            <Form.Label>New Password</Form.Label>
            <FormControl
              type="password"
              id="newPassword"
              name="newPassword"
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
              required
            />
          </FormGroup>
          <FormGroup>
            <Form.Label>Repeat New Password</Form.Label>
            <FormControl
              type="password"
              id="repeatNewPassword"
              name="repeatNewPassword"
              value={reNewPassword}
              onChange={(event) => setReNewPassword(event.target.value)}
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
