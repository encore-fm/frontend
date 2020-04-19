import React from 'react';

import './DefaultTextField.scss';

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
