import React from "react";
import "./CustomInput.scss";

const CustomInput = ({ label, placeholder, type, onChange, errorMessage, value }) => {
  return (
    <div className="custom__input__container">
      {errorMessage && <p>{errorMessage}</p>}
      <div className="custom__input">
        <label>{label}</label>
        <input placeholder={placeholder} type={type} onChange={onChange} value={value} />
      </div>
    </div>
  );
};

export default CustomInput;
