import React from "react";
import "./landingPage.scss";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

const LandingPage = () => {
  return (
    <React.Fragment>
      <div className="header-section">
        <Navbar
          bg="transparent"
          variant="light"
          expand="lg"
          className="d-none d-md-flex"
        >
          <Navbar.Brand>
            <Link to="/">
              <img
                alt="logo"
                className="brand_logo "
                src="/images/NewLogo.png"
              />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link className="mrAuto">ABOUT</Nav.Link>
              <Nav.Link className="mrAuto">SERVICES</Nav.Link>
              <Nav.Link className="mrAuto">LEARN</Nav.Link>
            </Nav>
            <ul className="button-wrapper">
              <Link className="login" to="/login">
                <span>LOG IN</span>
              </Link>
              <Link className="login" to="/admin-login">
                <span>LOG IN AS ADMIN</span>
              </Link>
              <Link className="get-started" to="/sign-up">
                <span>GET STARTED</span>
              </Link>
            </ul>
          </Navbar.Collapse>
        </Navbar>
        <Navbar
          bg="light"
          expand="lg"
          className="header d-flex d-md-none w-100"
        >
          <Navbar.Brand>
            <Link to="/">
              <img
                alt="logo"
                className="brand_logo "
                src="/images/NewLogo.png"
              />
            </Link>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto navLinkManage">
              <Nav.Link className="navLinkManage">ABOUT</Nav.Link>
              <Nav.Link className="navLinkManage">SERVICES</Nav.Link>
              <Nav.Link className="navLinkManage">LEARN</Nav.Link>
            </Nav>
            <ul className="button-wrapper">
              <Link className="login" to="/login">
                <span>LOG IN</span>
              </Link>
              <Link className="login" to="/admin-login">
                <span>LOG IN AS ADMIN</span>
              </Link>
              <Link className="get-started" to="/sign-up">
                <span>GET STARTED</span>
              </Link>
            </ul>
          </Navbar.Collapse>
        </Navbar>
      </div>
      <div className="position-relative">
        <div className="full-screen">
          <div className="background"></div>
          <div className="overlay" />
        </div>
        <div className="container">
          <div className="row">
            <div className="header-text-section text-center">
              <div className="header-title">
                <h1>Telehealth is the health-related services.</h1>
                <h3>
                  The provision of healthcare remotely by means of
                  telecommunications technology !
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default LandingPage;
