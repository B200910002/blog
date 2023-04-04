import React, { Component } from "react";
import { Form, FormGroup, FormControl, Button } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import { Link, Outlet } from "react-router-dom";


export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { email: "", password: "", response: "" };
  }
  static contextType = AuthContext;
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { login } = this.context;
    const response = await login(this.state.email, this.state.password);
    this.setState({ response: response });
  };
  render() {
    const { response } = this.state;
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormGroup>
          <Form.Label>Email:</Form.Label>
          <FormControl
            type="email"
            id="email"
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Form.Label>Password:</Form.Label>
          <FormControl
            type="password"
            id="password"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
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
}
