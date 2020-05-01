import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Field, reduxForm, reset } from "redux-form";
import { toast } from "react-toastify";
import { Col, FormGroup, Label, Form, Row } from "reactstrap";
import {
  billingEngine,
  resetFlags
} from "../../../redux/actions/PatientAction";
import ValidatedInput from "../../../components/ValidatedInput";
import ValidatedSelect from "../../../components/ValidatedSelect";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { getAmounts } from "../../../utils/helper";
import { AMOUNTS } from "../../../utils/constants";
import { getCurrencies } from "../../../utils/helper";
import { CURRENCIES } from "../../../utils/constants";
import { getMonths } from "../../../utils/helper";
import { MONTHS } from "../../../utils/constants";
import { getYears } from "../../../utils/helper";
import { YEARS } from "../../../utils/constants";

const BillingEngine = ({
  billingEngineFlags,
  billingEngineErrors,
  billingEngine,
  resetFlags,
  history,
  resetForm,
  handleSubmit
}) => {
  const [processing, setProcessing] = useState(false);
  const [amounts] = useState(getAmounts());
  const [currencies] = useState(getCurrencies());
  const [months] = useState(getMonths());
  const [years] = useState(getYears());

  useEffect(() => {
    if (billingEngineErrors && billingEngineErrors.billingEngine) {
      toast.error(billingEngineErrors.billingEngine);
      resetFlags();
      setProcessing(false);
    }

    if (billingEngineFlags && billingEngineFlags.billingEngine) {
      resetFlags();
      setProcessing(false);
      toast.success(billingEngineFlags.billingEngine);
      resetForm("BillingEngineForm");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [billingEngineErrors, billingEngineFlags]);

  const handleBillingEngine = formData => {
    setProcessing(true);
    const {
      amountVal,
      currencyVal,
      description,
      card_number,
      expire_monthVal,
      expire_yearVal,
      cvc
    } = formData;

    const amount = AMOUNTS.find(amount => amount.name === amountVal);

    const currency = CURRENCIES.find(currency => currency.name === currencyVal);

    const month = MONTHS.find(month => month.name === expire_monthVal);

    const year = YEARS.find(year => year.name === expire_yearVal);

    billingEngine({
      amount: amount.value,
      currency: currency.value,
      description,
      card_number,
      exp_month: month.value,
      exp_year: year.value,
      cvc
    });
  };

  return (
    <div className="auth-page-wrapper">
      <Form
        className="form-container"
        onSubmit={handleSubmit(handleBillingEngine)}
      >
        <div className="form-title">
          <h1>Make Payment</h1>
        </div>
        <br />

        <FormGroup row>
          <Label for="amountVal" sm={4} xs={12}>
            Co-pay invoices:
          </Label>
          <Col sm={7} xs={10}>
            <Field
              sm={4}
              component={ValidatedSelect}
              name="amountVal"
              value={amounts[0].name}
              placeholder="Select Amount"
              isSearchable={true}
              isClearable={true}
              options={amounts}
            />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label for="currencyVal" sm={4} xs={12}>
            Currency:
          </Label>
          <Col sm={7} xs={10}>
            <Field
              sm={4}
              component={ValidatedSelect}
              name="currencyVal"
              value={currencies[0].name}
              placeholder="Select currency"
              isSearchable={true}
              isClearable={true}
              options={currencies}
            />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label sm={4}>Description</Label>
          <Col sm={7}>
            <Field
              component={ValidatedInput}
              type="text"
              name="description"
              placeholder="Description"
            />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label sm={4}>Card Number</Label>
          <Col sm={7}>
            <Field
              component={ValidatedInput}
              type="text"
              name="card_number"
              placeholder="Card Number"
            />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label for="amount" sm={4} xs={12}>
            Expire Month:
          </Label>
          <Col sm={7} xs={10}>
            <Field
              sm={4}
              component={ValidatedSelect}
              name="expire_monthVal"
              value={months[0].name}
              placeholder="Select Month"
              isSearchable={true}
              isClearable={true}
              options={months}
            />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label for="amount" sm={4} xs={12}>
            Expire Year:
          </Label>
          <Col sm={7} xs={10}>
            <Field
              sm={4}
              component={ValidatedSelect}
              name="expire_yearVal"
              value={years[0].name}
              placeholder="Select Year"
              isSearchable={true}
              isClearable={true}
              options={years}
            />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label sm={4}>CVC Number</Label>
          <Col sm={7}>
            <Field
              component={ValidatedInput}
              type="text"
              name="cvc"
              placeholder="CVC Number"
            />
          </Col>
        </FormGroup>

        <Row>
          <Col sm={6}></Col>
          <Col sm={5}>
            <div className="button_wrapper">
              <button
                className="custom-btn-primary"
                type="submit"
                disabled={processing}
              >
                Submit {processing && <FontAwesomeIcon icon={faSpinner} spin />}
              </button>
            </div>
          </Col>
          <Col sm={1}></Col>
        </Row>
      </Form>
      <br /> <br /> <br />
    </div>
  );
};

const validate = values => {
  const errors = {};
  if (!values.amountVal) {
    errors.amountVal = "Please select Co-pay invoices";
  }
  if (!values.currencyVal) {
    errors.currencyVal = "Please select currency";
  }
  if (!values.description) {
    errors.description = "Field is required";
  }

  if (!values.expire_monthVal) {
    errors.expire_monthVal = "Please select month";
  }

  if (!values.expire_yearVal) {
    errors.expire_yearVal = "Please select year";
  }

  if (!values.cvc) {
    errors.cvc = "Field is required";
  }
  if (!values.card_number) {
    errors.card_number = "Field is required";
  }

  return errors;
};

const mapStateToProps = state => ({
  billingEngineErrors: state.Patient.errors,
  billingEngineFlags: state.Patient.flags
});

const mapDispatchToProps = dispatch => ({
  billingEngine: payload => {
    dispatch(billingEngine(payload));
  },
  resetFlags: payload => {
    dispatch(resetFlags());
  },
  resetForm: BillingEngineForm => {
    dispatch(reset(BillingEngineForm));
  }
});

const BillingEngineComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(BillingEngine);

export default reduxForm({
  form: "BillingEngineForm",
  validate
})(BillingEngineComponent);
