import React from "react";
import Select from "react-select";

const ValidatedSelect = field => {
  const {
    input,
    name,
    options,
    disabled,
    placeholder,
    isSearchable = false,
    isClearable = false,
    meta: { touched, error, warning }
  } = field;

  return (
    <div>
      <Select
        name={name}
        value={input.value ? { label: input.value, value: input.value } : null}
        isClearable={isClearable}
        isSearchable={isSearchable}
        isDisabled={disabled}
        options={options}
        placeholder={placeholder}
        onChange={value => input.onChange(value ? value.value : null)}
        onBlur={value => input.onBlur(value ? value.value : null)}
      />
      {touched &&
        ((error && <p className="help is-danger text-danger">{error}</p>) ||
          (warning && <p className="help is-danger text-danger">{warning}</p>))}
    </div>
  );
};

export default ValidatedSelect;
