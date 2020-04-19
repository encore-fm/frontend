import React from "react";

import "./IconPause.scss"

const IconPause = ({onClick, size = 30, style = {}}) => {
  const styles = {
    width: `${size}px`,
    height: `${size}px`,
  };
  return <div style={styles} className="IconPause" onClick={onClick}/>
};

export default IconPause;
