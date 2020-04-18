import React from 'react';

import './IconPlus.scss';

const IconPlus = ({highlight, onClick, size = '30px'}) => {
  const styles = {
    width: size,
    height: size,
  };
  return <div style={styles} className={`IconPlus ${highlight === true ? 'highlight' : ''}`} onClick={onClick}/>;
};


export default IconPlus;
