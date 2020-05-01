import React from "react";
import "./authFooter.scss";

const AuthFooter = () => {
  return (
    <div className="footer">
      <div className="logo_wrapper">
        <img alt="logo" className="brand_logo" src="/images/NewLogo.png" />
        {/* Copyright ©2020 Telehealth, Inc. All rights reserved. Privacy Policy · Terms */}
      </div>
    </div>
  );
};
export default AuthFooter;
