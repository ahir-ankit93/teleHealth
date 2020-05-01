import React from "react";
import { Link } from "react-router-dom";
import { Form } from "reactstrap";
const FormThree = () => {
  return (
    <div className="auth-page-wrapper">
      <Form className="form-container">
        <div className="back-btn">
          <Link to="/home">Home</Link>
        </div>
        <div className="form-title">
          <h1>Patient Financial Responsibilities Notice</h1>
        </div>
        <hr />
        <h5>Patient Financial Responsibilities Notice</h5>
      </Form>
    </div>
  );
};

export default FormThree;
