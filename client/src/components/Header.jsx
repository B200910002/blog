import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Nav, NavItem, Navbar } from "react-bootstrap";
import { Containers } from "../constants/styles";
import { AuthContext } from "../context/AuthContext";

export default class Header extends Component {
  static contextType = AuthContext;
  render() {
    const { logout, user } = this.context;
    return (
      <header style={Containers.main}>
        <Nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top px-5 py-0">
          <Navbar className="me-auto p-0">
            <NavItem className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </NavItem>
            <NavItem className="nav-item">
              <Link className="nav-link" to="contact">
                Contact
              </Link>
            </NavItem>
          </Navbar>
          <Navbar className="p-0">
            <NavItem>
              <Link className="nav-link" to={user.email}>
                {user.email}
              </Link>
            </NavItem>
            <NavItem>
              <Link onClick={() => logout()}>Logout</Link>
            </NavItem>
          </Navbar>
        </Nav>
      </header>
    );
  }
}
