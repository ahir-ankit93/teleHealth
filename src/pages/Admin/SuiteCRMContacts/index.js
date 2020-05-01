import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import { toast } from "react-toastify";
import {
  Table,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Card,
  Form,
  Row,
  Col
} from "reactstrap";
import {
  suiteCRMContacts,
  sendToOpenEMR,
  resetFlags
} from "../../../redux/actions/AdminAction";
// import ValidatedInput from "../../../components/ValidatedInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressCard } from "@fortawesome/free-solid-svg-icons";
import PageLoader from "../../../components/PageLoader";
import classnames from "classnames";
const SuiteCRMContacts = ({
  suiteCRMContactsFlags,
  suiteCRMContactsErrors,
  suiteCRMContacts,
  sendToOpenEMR,
  resetFlags,
  history,
  handleSubmit,
  contacts
}) => {
  const [loading, setLoading] = useState(false);

  const [activeTab, setActiveTab] = useState("1");

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  useEffect(() => {
    suiteCRMContacts();
    setLoading(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let newSuitecrmContacts = [];
  let addedToOpenEMR = [];
  if (contacts && contacts.length) {
    newSuitecrmContacts = contacts.filter(user => user.added_to_openEMR === 0);

    addedToOpenEMR = contacts.filter(user => user.added_to_openEMR === 1);
  }

  useEffect(() => {
    if (suiteCRMContactsErrors && suiteCRMContactsErrors.suiteCRMContacts) {
      toast.error(suiteCRMContactsErrors.suiteCRMContacts);
      resetFlags();
    }

    if (suiteCRMContactsFlags && suiteCRMContactsFlags.suiteCRMContacts) {
      setLoading(false);
      resetFlags();
    }

    if (suiteCRMContactsErrors && suiteCRMContactsErrors.sendToOpenEMR) {
      toast.error(suiteCRMContactsErrors.sendToOpenEMR);
      resetFlags();
    }

    if (suiteCRMContactsFlags && suiteCRMContactsFlags.sendToOpenEMR) {
      toast.success(suiteCRMContactsFlags.sendToOpenEMR);
      resetFlags();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [suiteCRMContactsErrors, suiteCRMContactsFlags]);

  const handleSendToOpenEMR = id => {
    sendToOpenEMR({
      contact_id: id
    });
  };

  if (loading) {
    return <PageLoader />;
  }

  return (
    <div className="container">
      <Form>
        <div className="form-title">
          <h1>SuiteCRM Contacts</h1>
        </div>
        <br />

        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === "1" })}
              onClick={() => {
                toggle("1");
              }}
            >
              New SuiteCRM Contacts
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === "2" })}
              onClick={() => {
                toggle("2");
              }}
            >
              Added to OpenEMR
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col sm="12">
                <Card body>
                  {newSuitecrmContacts && newSuitecrmContacts.length ? (
                    <Table hover>
                      <thead>
                        <tr className="headerHeading">
                          <th>Sr.No</th>
                          <th>First Name</th>
                          <th>Last Name</th>
                          <th>Contact</th>
                          <th>City</th>
                          <th>State</th>
                          <th>Country</th>
                          <th>
                            Action &nbsp;{" "}
                            <FontAwesomeIcon
                              icon={faAddressCard}
                            ></FontAwesomeIcon>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {newSuitecrmContacts && (
                          <React.Fragment>
                            {newSuitecrmContacts.map((result, indexAdd) => (
                              <tr key={indexAdd}>
                                <td>{indexAdd + 1}</td>
                                <td>{result.first_name}</td>
                                <td>{result.last_name}</td>
                                <td>{result.phone_mobile}</td>
                                <td>{result.primary_address_city}</td>
                                <td>{result.primary_address_state}</td>
                                <td>{result.primary_address_country}</td>
                                <td>
                                  <button
                                    className="btn-primary btn-sm"
                                    onClick={e =>
                                      handleSendToOpenEMR(result.id)
                                    }
                                  >
                                    Add
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </React.Fragment>
                        )}
                      </tbody>
                    </Table>
                  ) : (
                    <h3>No data found</h3>
                  )}
                </Card>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <Col sm="12">
                <Card body>
                  {addedToOpenEMR && addedToOpenEMR.length ? (
                    <Table hover>
                      <thead>
                        <tr className="headerHeading">
                          <th>Sr.No</th>
                          <th>First Name</th>
                          <th>Last Name</th>
                          <th>Contact</th>
                          <th>City</th>
                          <th>State</th>
                          <th>Country</th>
                        </tr>
                      </thead>
                      <tbody>
                        {addedToOpenEMR && (
                          <React.Fragment>
                            {addedToOpenEMR.map((result, index1) => (
                              <tr key={index1}>
                                <td>{index1 + 1}</td>
                                <td>{result.first_name}</td>
                                <td>{result.last_name}</td>
                                <td>{result.phone_mobile}</td>
                                <td>{result.primary_address_city}</td>
                                <td>{result.primary_address_state}</td>
                                <td>{result.primary_address_country}</td>
                              </tr>
                            ))}
                          </React.Fragment>
                        )}
                      </tbody>
                    </Table>
                  ) : (
                    <h3>No data found</h3>
                  )}
                </Card>
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </Form>
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
  suiteCRMContactsErrors: state.Admin.errors,
  suiteCRMContactsFlags: state.Admin.flags,
  contacts: state.Admin.suiteCRMContacts
});

const mapDispatchToProps = dispatch => ({
  suiteCRMContacts: payload => {
    dispatch(suiteCRMContacts(payload));
  },
  sendToOpenEMR: payload => {
    dispatch(sendToOpenEMR(payload));
  },
  resetFlags: payload => {
    dispatch(resetFlags());
  }
});

const SuiteCRMContactsComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(SuiteCRMContacts);

export default reduxForm({
  form: "SuiteCRMContactsForm",
  validate
})(SuiteCRMContactsComponent);
