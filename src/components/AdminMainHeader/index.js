import React, { useState } from "react";
import { connect } from "react-redux";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import "./adminMainHeader.scss";
import {
  adminLogout,
  toggleMobileMenu,
  clearStore
} from "../../redux/actions/AuthAction";
const AdminMainHeader = ({ admin, history, toggleMobileMenu, adminLogout }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen(prevState => !prevState);

  const handleAdminLogout = () => {
    localStorage.removeItem("admin");
    localStorage.removeItem("token");
    adminLogout();
    clearStore();
    history.push("/");
  };

  return (
    <div className="site-header">
      <div className="top-bar">
        <a href="#/">Welcome Admin</a>
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle caret>
            <FontAwesomeIcon size="lg" icon={faUserCircle} /> &nbsp;&nbsp;
            {(admin && (admin.first_name || admin.username)) || "Admin"}
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem onClick={handleAdminLogout}>Logout</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <button className="sidebar-toggle ml-2" onClick={toggleMobileMenu}>
          <FontAwesomeIcon icon={faBars} />
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  authAdminErrors: state.Auth.errors,
  authAdminFlags: state.Auth.flags,
  admin: state.admin,
  showMobileMenu: state.Auth.showMobileMenu
});

const mapDispatchToProps = dispatch => ({
  adminLogout: payload => {
    dispatch(adminLogout(payload));
  },
  clearStore: payload => {
    dispatch(clearStore(payload));
  },
  toggleMobileMenu: payload => {
    dispatch(toggleMobileMenu(payload));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminMainHeader);
