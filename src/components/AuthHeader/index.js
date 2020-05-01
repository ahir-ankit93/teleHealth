import React from "react";
import { Link } from "react-router-dom";

import "./authHeader.scss";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

const AuthHeader = () => {
  return (
    <div className="header">
      <Navbar bg="light" expand="lg">
        <Navbar.Brand>
          <Link to="/">
            <img alt="logo" className="brand_logo " src="/images/NewLogo.png" />
          </Link>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link></Nav.Link>
            <Nav.Link>ABOUT</Nav.Link>
            <Nav.Link>SERVICES</Nav.Link>
            <Nav.Link>LEARN</Nav.Link>
          </Nav>
          <div className="button-wrapper">
            <Link className="login" to="/">
              <span>Back</span>
            </Link>
            <Link className="get-started" to="/login">
              <span>Login</span>
            </Link>
          </div>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};
export default AuthHeader;
