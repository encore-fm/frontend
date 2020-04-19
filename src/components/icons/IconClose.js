import React from "react";
import IconPlus from "./IconPlus";

const IconClose = ({highlight, onClick, size = '30px'}) => {
  const styles = {
    transform: 'rotate(45deg)',
  };
  return <IconPlus highlight={highlight} onClick={onClick} size={size} style={styles}/>
};

export default IconClose;
