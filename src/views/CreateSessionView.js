import React from 'react';
import ContentWrapper from '../components/ContentWrapper';
import DefaultTextField from '../components/DefaultTextField';
import Button from '../components/Button';
import CreateSessionForm from "../containers/CreateSessionForm";

const CreateSessionView = () => {
  return (
    <ContentWrapper>
      creating a new session.<br />
      please choose your username.<br />
      <br />

      <CreateSessionForm/>
    </ContentWrapper>
  )
};

export default CreateSessionView;
