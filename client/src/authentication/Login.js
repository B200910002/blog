import React, { useContext, useState } from "react";
import { Form, FormGroup, FormControl, Button } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Login() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await login(email, password);
    setResponse(response);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Form.Label>Email:</Form.Label>
        <FormControl
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
      </FormGroup>
      <FormGroup>
        <Form.Label>Password:</Form.Label>
        <FormControl
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
      </FormGroup>
      <br />
      <Link to="register">Don't have account?</Link>
      <br />
      <Button color="primary" type="submit">
        Login
      </Button>
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
    </Form>
  );
}
