import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Field, reduxForm, reset } from "redux-form";
import { toast } from "react-toastify";
import {
  Col,
  FormGroup,
  Table,
  Form,
  Input as InputComponent
} from "reactstrap";
import { searchDoctors, resetFlags } from "../../redux/actions/PatientAction";
import ValidatedInput from "../../components/ValidatedInput";
import ValidatedSelect from "../../components/ValidatedSelect";
import "./searchDoctor.scss";
import { getProviders } from "../../utils/helper";
import { PROVIDERS } from "../../utils/constants";
const SearchDoctors = ({
  searchDoctorsFlags,
  searchDoctorsErrors,
  searchDoctors,
  searchedDoctors,
  dispatch,
  resetFlags,
  history,
  handleSubmit,
  resetForm,
  searchResults,
  handleChange,
  pastData
}) => {
  const [providers] = useState(getProviders());

  const getChecked = id => {
    return parseInt(pastData) === parseInt(id);
  };

  useEffect(() => {
    if (searchDoctorsErrors && searchDoctorsErrors.searchDoctors) {
      toast.error(searchDoctorsErrors.searchDoctors);
      resetFlags();
    }

    if (searchDoctorsFlags && searchDoctorsFlags.searchDoctors) {
      resetFlags();
      toast.success(searchDoctorsFlags.searchDoctors);
      resetForm("SearchDoctorsForm");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchDoctorsErrors, searchDoctorsFlags]);

  const handleSearchDoctors = formData => {
    const { name, provider_type } = formData;

    const provider = PROVIDERS.find(
      provider => provider.name === provider_type
    );

    if (!name && provider_type) {
      searchDoctors({
        provider_type: provider.value
      });
    } else if (name && !provider_type) {
      searchDoctors({
        name
      });
    } else {
      searchDoctors({
        name,
        provider_type: provider.value
      });
    }
  };

  return (
    <div className="container">
      <div className="form-title">
        <h2>Search Doctors</h2>
      </div>
      <Form onSubmit={handleSubmit(handleSearchDoctors)}>
        <FormGroup row className="align-items-center">
          <Col sm={3} className="paddingManage">
            <Field
              style={{ lineHeight: "18px" }}
              component={ValidatedInput}
              type="text"
              placeholder="Name"
              name="name"
              defaultValue={null}
            />
          </Col>
          <Col sm={5} className="paddingManage">
            <Field
              style={{ lineHeight: "18px" }}
              component={ValidatedSelect}
              name="provider_type"
              value={providers[0].name}
              placeholder="Provider Type"
              isSearchable={true}
              isClearable={true}
              options={providers}
            />
          </Col>
          <Col sm={4} className="paddingManage">
            <div className="button_wrapper">
              <button
                className="custom-btn-primary"
                type="submit"
                style={{ lineHeight: "17px" }}
              >
                Search
              </button>
            </div>
          </Col>
        </FormGroup>

        <FormGroup row>
          <Col sm={12}>
            {searchResults && searchResults.length ? (
              <Table hover>
                <thead>
                  <tr>
                    <th>Sr.No</th>
                    <th>Doctors Name</th>
                    <th>Physician Type</th>
                  </tr>
                </thead>
                <tbody>
                  {searchResults.map((result, index) => (
                    <tr key={index}>
                      <td>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <InputComponent
                          type="checkbox"
                          name="myPastAppointment"
                          value={result.id}
                          checked={getChecked(result.id)}
                          onChange={handleChange}
                        />
                        {index + 1}
                      </td>
                      <td>{result.fname}</td>
                      <td>{result.physician_type}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <h3>No data found</h3>
            )}
          </Col>
        </FormGroup>
      </Form>
    </div>
  );
};

const validate = values => {
  const errors = {};
  if (!values.name && !values.provider_type) {
    errors.provider_type = "Please enter name or select provider types";
  }

  return errors;
};

const mapStateToProps = state => ({
  searchDoctorsErrors: state.Patient.errors,
  searchDoctorsFlags: state.Patient.flags,
  searchResults: state.Patient.searchResults
});

const mapDispatchToProps = dispatch => ({
  searchDoctors: payload => {
    dispatch(searchDoctors(payload));
  },
  resetFlags: payload => {
    dispatch(resetFlags());
  },
  resetForm: SearchDoctorsForm => {
    dispatch(reset(SearchDoctorsForm));
  }
});

const SearchDoctorsComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchDoctors);

export default reduxForm({
  form: "SearchDoctorsForm",
  validate
})(SearchDoctorsComponent);
