import React from 'react';

import './Button.scss';

const Button = ({text, type, style, onClick}) => {
  return (
    <button
      className="Button"
      style={style}
      type={type}
      onClick={onClick}
    >{text}</button>
  )
};

export default Button;
