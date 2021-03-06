import React from 'react';

import './DefaultTextField.scss';
import {REQUEST_NOT_AUTHORIZED_ERROR, SESSION_NOT_FOUND_ERROR} from "../services/backend/constants";

const DefaultTextField = ({value, onChange, placeholder, styles = {}, autofocus = false, error = null}) => {
  return (
    <div className="DefaultTextFieldWrapper">
      <input
        value={value}
        className="DefaultTextField"
        placeholder={placeholder}
        autoFocus={autofocus}
        onChange={onChange}
        style={styles}
      />
      <div className="DefaultTextField_error">{error.description}</div>
    </div>
  )
};

export default DefaultTextField;
