import React from "react";

import "./IconPlay.scss"

const IconPlay = ({onClick, size = 30, style = {}}) => {
  const styles = {
    width: `${size}px`,
    height: `${size}px`,
  };
  return <div style={styles} className="IconPlay" onClick={onClick}/>
};

export default IconPlay;
