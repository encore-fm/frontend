import React from 'react';
import ContentWrapper from '../components/ContentWrapper';
import {Link} from 'react-router-dom';

const WelcomeView = () => {
  return (
    <ContentWrapper>
      <div>
        this is encore.<br/>
        <Link to="/create">create</Link> a session or <Link to={null}>join</Link>.
      </div>
    </ContentWrapper>
  )
};

export default WelcomeView;
