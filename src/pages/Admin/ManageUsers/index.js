import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import { toast } from "react-toastify";
import { Table } from "reactstrap";
import {
  manageUsers,
  deleteUser,
  resetFlags
} from "../../../redux/actions/AdminAction";
// import ValidatedInput from "../../../components/ValidatedInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import PageLoader from "../../../components/PageLoader";

const ManageUsers = ({
  manageUserFlags,
  manageUserErrors,
  manageUsers,
  deleteUser,
  resetFlags,
  history,
  handleSubmit,
  users
}) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    manageUsers();
    setLoading(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (manageUserErrors && manageUserErrors.manageUsers) {
      toast.error(manageUserErrors.manageUsers);
      resetFlags();
    }

    if (manageUserFlags && manageUserFlags.manageUsers) {
      setLoading(false);
      resetFlags();
    }

    if (manageUserErrors && manageUserErrors.deleteUser) {
      toast.error(manageUserErrors.deleteUser);
      resetFlags();
    }

    if (manageUserFlags && manageUserFlags.deleteUser) {
      toast.success(manageUserFlags.deleteUser);
      resetFlags();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [manageUserErrors, manageUserFlags]);

  const handleDeleteUser = id => {
    deleteUser({
      user_id: id
    });
  };

  if (loading) {
    return <PageLoader />;
  }

  return (
    <div className="container">
      <div className="form-title">
        <h1>Telehealth Users</h1>
      </div>
      <br />
      <Table hover>
        <thead>
          <tr className="headerHeading">
            <th>Sr.No</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>
              Action &nbsp;{" "}
              <FontAwesomeIcon icon={faTrashAlt}></FontAwesomeIcon>
            </th>
          </tr>
        </thead>
        <tbody>
          {users.slice(0, 7).map((result, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{result.first_name}</td>
              <td>{result.last_name}</td>
              <td>{result.email}</td>
              <td>
                <button
                  className="btn-danger btn-sm"
                  onClick={e =>
                    window.confirm(
                      "Are you sure you want to delete this user?"
                    ) && handleDeleteUser(result.id)
                  }
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

const validate = values => {
  const errors = {};
  // if (!values.doctor_name) {
  //   errors.doctor_name = "Field is required";
  // }

  return errors;
};

const mapStateToProps = state => ({
  manageUserErrors: state.Admin.errors,
  manageUserFlags: state.Admin.flags,
  users: state.Admin.users
});

const mapDispatchToProps = dispatch => ({
  manageUsers: payload => {
    dispatch(manageUsers(payload));
  },
  deleteUser: payload => {
    dispatch(deleteUser(payload));
  },
  resetFlags: payload => {
    dispatch(resetFlags());
  }
});

const ManageUsersComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageUsers);

export default reduxForm({
  form: "ManageUsersForm",
  validate
})(ManageUsersComponent);
