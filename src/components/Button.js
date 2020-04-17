import React from 'react';

import './Button.scss';

const Button = ({text, type}) => {
  return (
    <button className="Button" type={type}>{text}</button>
  )
};

export default Button;
