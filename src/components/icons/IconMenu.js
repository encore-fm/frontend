import React from "react";

import "./IconMenu.scss";

const IconMenu = ({highlight, onClick, size = '30px', style = {}}) => {

  const styles = {
    ...style,
    height: size,
    width: size
  };

  return <div className="IconMenu" style={styles} onClick={onClick}/>
};

export default IconMenu;
