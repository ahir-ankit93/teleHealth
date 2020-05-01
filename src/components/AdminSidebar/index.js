import React from "react";
import "./adminSidebar.scss";
import { toggleMobileMenu } from "../../redux/actions/AuthAction";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUsers,
  faVideo,
  faAddressBook,
  faFileMedical
} from "@fortawesome/free-solid-svg-icons";

const AdminSidebar = ({ showMobileMenu }) => (
  <div className={`sidebar-panel  ${!showMobileMenu ? "hide-mobile" : ""}`}>
    <nav>
      <a href="#/">
        <img src="/images/NewLogo.png" alt="Telehealth" />
      </a>
    </nav>
    <ul>
      <li>
        <Link to="/admin-home">
          <FontAwesomeIcon size="lg" icon={faHome} /> &nbsp; &nbsp; Home
        </Link>
      </li>
      <li>
        <Link to="/manage-users">
          <FontAwesomeIcon size="lg" icon={faUsers} /> &nbsp; &nbsp; Telehealth
          Users
        </Link>
      </li>
      <li>
        <Link to="/suiteCRM-contacts">
          <FontAwesomeIcon size="lg" icon={faAddressBook} /> &nbsp; &nbsp;
          SuiteCRM Contacts
        </Link>
      </li>
      <li>
        <Link to="/audit-reports">
          <FontAwesomeIcon size="lg" icon={faFileMedical} /> &nbsp; &nbsp; Audit
          Reports
        </Link>
      </li>
      <li>
        <Link to="/meeting">
          <FontAwesomeIcon size="lg" icon={faVideo} /> &nbsp; &nbsp; Zoom
          Meeting
        </Link>
      </li>

      <li className="divider"></li>
      <li>{/* <a href="#/"></a> */}</li>
      <li>{/* <a href="#/"></a> */}</li>
      <li>{/* <a href="#/"></a> */}</li>
      {/* <a href="#/" className="link">
      </a> */}
    </ul>
  </div>
);

const mapStateToProps = state => ({
  showMobileMenu: state.Auth.showMobileMenu
});

const mapDispatchToProps = dispatch => ({
  toggleMobileMenu: payload => {
    dispatch(toggleMobileMenu(payload));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminSidebar);
