import React from 'react';
import ContentWrapper from "../components/ContentWrapper";
import {Link} from "react-router-dom";

const WelcomeView = () => {
  return (
    <ContentWrapper>
      this is encore.<br/>
      <Link to={null}>create</Link> a session or <Link to={null}>join</Link>.
    </ContentWrapper>
  )
};

export default WelcomeView;
