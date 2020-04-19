import React from 'react';

import './IconPlus.scss';

const IconPlus = ({highlight, onClick, size = '30px', style = {}}) => {
  const styles = {
    width: size,
    height: size,
    ...style,
  };
  return <div style={styles} className={`IconPlus ${highlight === true ? 'highlight' : ''}`} onClick={onClick}/>;
};


export default IconPlus;
