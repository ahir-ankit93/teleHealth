import React from "react";
import "./sidebar.scss";
import { toggleMobileMenu } from "../../redux/actions/AuthAction";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  // faUserPlus,
  faUserEdit,
  // faSearch,
  faCalendarAlt,
  // faVideo,
  faMoneyCheck
  // faSms
} from "@fortawesome/free-solid-svg-icons";

const Sidebar = ({ showMobileMenu, props }) => (
  <div className={`sidebar-panel  ${!showMobileMenu ? "hide-mobile" : ""}`}>
    <nav>
      <a href="#/">
        <img src="/images/NewLogo.png" alt="Telehealth" />
      </a>
    </nav>
    <ul>
      <li>
        <Link to="/home">
          <FontAwesomeIcon size="lg" icon={faHome} /> &nbsp; &nbsp; Home
        </Link>
      </li>
      {/* <li>
        <Link to="/create-profile">
          <FontAwesomeIcon size="lg" icon={faUserPlus} /> &nbsp; &nbsp; Add
          Profile
        </Link>
      </li> */}
      <li>
        <Link to="/update-profile">
          <FontAwesomeIcon size="lg" icon={faUserEdit} /> &nbsp; &nbsp; Update
          Profile
        </Link>
      </li>
      {/* <li>
        <Link to="/search-doctors">
          <FontAwesomeIcon size="lg" icon={faSearch} /> &nbsp; &nbsp; Search
          Doctors
        </Link>
      </li> */}

      {/* <li>
        <Link to="/meeting">
          <FontAwesomeIcon size="lg" icon={faVideo} /> &nbsp; &nbsp; Zoom
          Meeting
        </Link>
      </li> */}
      <li>
        <Link to="/billing">
          <FontAwesomeIcon size="lg" icon={faMoneyCheck} /> &nbsp; &nbsp; Make
          Payment
        </Link>
      </li>
      {/* <li>
        <Link to="/chat">
          <FontAwesomeIcon size="lg" icon={faSms} /> &nbsp; &nbsp; Chat
        </Link>
      </li> */}
      <li>
        <Link to="/appointment">
          <FontAwesomeIcon size="lg" icon={faCalendarAlt} /> &nbsp; &nbsp;
          Request Appointment
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

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
