import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import "./mainHeader.scss";
import {
  toggleMobileMenu,
  getUserDetail,
  clearStore,
  resetFlags
} from "../../redux/actions/AuthAction";
import moment from "moment";
const MainHeader = ({
  getUserDetailFlags,
  getUserDetailErrors,
  getUserDetail,
  clearStore,
  userDetails,
  resetFlags,
  user,
  history,
  toggleMobileMenu,
  handleSubmit
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen(prevState => !prevState);

  useEffect(() => {
    getUserDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (getUserDetailErrors && getUserDetailErrors.getUserDetail) {
      toast.error(getUserDetailErrors.getUserDetail);
      resetFlags();
    }

    if (getUserDetailFlags && getUserDetailFlags.getUserDetail) {
      resetFlags();
      toast.success(getUserDetailFlags.getUserDetail);

      // history.push("/update-profile");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getUserDetailErrors, getUserDetailFlags]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    clearStore();
    history.push("/");
  };

  return (
    <div className="site-header">
      <div className="top-bar">
        <a href="#/">
          Welcome {(userDetails && userDetails.first_name) || "User"} &nbsp;
          &nbsp;
        </a>
        <a href="#/">
          &nbsp;&nbsp;Last Visit&nbsp;:&nbsp;
          {(userDetails &&
            userDetails.last_login &&
            moment
              .utc(userDetails.last_login)
              .format("MM-DD-YYYY    [at]    HH:mm")) ||
            " Congrats on first visit!  at  Telehealth "}
        </a>

        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle caret>
            <FontAwesomeIcon size="lg" icon={faUserCircle} /> &nbsp;&nbsp;
            {(userDetails && userDetails.username) || "Login"}
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
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
  authErrors: state.Auth.errors,
  authFlags: state.Auth.flags,
  user: state.Auth.user,
  getUserDetailErrors: state.Auth.errors,
  getUserDetailFlags: state.Auth.flags,
  getUserDetail: state.Auth.getUserDetail,
  // getUser: state.Auth.getUser,
  userDetails: state.Auth.userDetails,
  showMobileMenu: state.Auth.showMobileMenu
});

const mapDispatchToProps = dispatch => ({
  getUserDetail: payload => {
    dispatch(getUserDetail(payload));
  },
  clearStore: () => {
    dispatch(clearStore());
  },
  resetFlags: payload => {
    dispatch(resetFlags());
  },
  toggleMobileMenu: payload => {
    dispatch(toggleMobileMenu(payload));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(MainHeader);
