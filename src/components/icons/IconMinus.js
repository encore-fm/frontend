import React from 'react';

import './IconMinus.scss';

const IconMinus = ({highlight, onClick, size = '30px', style = {}}) => {

  const styles = {
    width: size,
    height: size,
    ...style,
  };

  return <div style={styles} className={`IconMinus ${highlight === true ? 'highlight' : ''}`} onClick={onClick}/>;
};

export default IconMinus;
