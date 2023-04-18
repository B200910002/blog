import React, { Component } from "react";
import { Form, FormGroup, FormControl, Button } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import { Link, Outlet } from "react-router-dom";

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fname: "",
      email: "",
      password: "",
      repeatPassword: "",
      response: "",
    };
  }
  static contextType = AuthContext;
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { register } = this.context;
    const response = await register(
      this.state.fname,
      this.state.email,
      this.state.password,
      this.state.repeatPassword
    );
    this.setState({ response: response });
    console.log(this.state.fname);
  };
  render() {
    const { response } = this.state;
    return (
      <Form onSubmit={this.handleSubmit}>
        <h2>Register</h2>
        <FormGroup>
          <Form.Label>Name:</Form.Label>
          <FormControl
            type="name"
            id="fname"
            name="fname"
            value={this.state.name}
            onChange={this.handleChange}
            required
          />
        </FormGroup>
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
        <FormGroup>
          <Form.Label>Repeat Password:</Form.Label>
          <FormControl
            type="password"
            id="repeatPassword"
            name="repeatPassword"
            value={this.state.repeatPassword}
            onChange={this.handleChange}
            required
          />
        </FormGroup>
        <br />
        <Button color="primary" type="submit">
          Register
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
