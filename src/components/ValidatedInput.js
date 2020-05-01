import React, { useState } from "react";
import DatePicker from "react-datepicker";
import moment from "moment";
import {
  Input as InputComponent,
  InputGroup,
  InputGroupAddon,
  InputGroupText
} from "reactstrap";

const ValidatedInput = field => {
  const {
    input,
    placeholder,
    disabled = false,
    type,
    minDate,
    maxDate,
    prefix,
    meta: { touched, error, warning }
  } = field;

  const [selectedDate, setSelectedDate] = useState();

  const handleDateChange = date => {
    setSelectedDate(date);
    const formattedDate = moment(date).format("MM/DD/YYYY");
    input.onChange(formattedDate);
  };

  return (
    <div>
      {type === "date" ? (
        <DatePicker
          {...input}
          dateFormat="MM/dd/yyyy"
          className="form-control"
          placeholderText="MM/DD/YYYY"
          showYearDropdown
          minDate={minDate}
          maxDate={maxDate}
          selected={selectedDate}
          onChange={value => handleDateChange(value)}
        />
      ) : prefix ? (
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>{prefix}</InputGroupText>
          </InputGroupAddon>
          <InputComponent
            type={type}
            disabled={disabled}
            placeholder={placeholder}
            {...input}
          />
        </InputGroup>
      ) : (
        <InputComponent
          type={type}
          disabled={disabled}
          placeholder={placeholder}
          {...input}
        />
      )}

      {touched &&
        ((error && <p className="text-danger">{error}</p>) ||
          (warning && <p className="help is-danger text-danger">{warning}</p>))}
    </div>
  );
};

export default ValidatedInput;
