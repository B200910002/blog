import React, { useContext, useState } from "react";
import { Form, FormGroup, FormControl, Button } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";

export default function Register() {
  const { register } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await register(name, email, password, rePassword);
    setResponse(response);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <FormGroup>
        <Form.Label>Name:</Form.Label>
        <FormControl
          type="name"
          id="fname"
          name="fname"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />
      </FormGroup>
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
      <FormGroup>
        <Form.Label>Repeat Password:</Form.Label>
        <FormControl
          type="password"
          id="repeatPassword"
          name="repeatPassword"
          value={rePassword}
          onChange={(event) => setRePassword(event.target.value)}
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

// export default class Register extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       fname: "",
//       email: "",
//       password: "",
//       repeatPassword: "",
//       response: "",
//     };
//   }
//   static contextType = AuthContext;
//   handleChange = (event) => {
//     this.setState({
//       [event.target.name]: event.target.value,
//     });
//   };

//   handleSubmit = async (event) => {
//     event.preventDefault();
//     const { register } = this.context;
//     const response = await register(
//       this.state.fname,
//       this.state.email,
//       this.state.password,
//       this.state.repeatPassword
//     );
//     this.setState({ response: response });
//     console.log(this.state.fname);
//   };
//   render() {
//     const { response } = this.state;
//     return (

//     );
//   }
// }
