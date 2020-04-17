import React from 'react';

import './ContentWrapper.scss'

const ContentWrapper = ({children, borderBottom}) => {
  let className = 'Content';
  if (borderBottom) className += ' Content_borderBottom';

  return (
    <section className={className}>
      {children}
    </section>
  )
};

export default ContentWrapper;
