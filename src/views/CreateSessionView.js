import React from 'react';
import ContentWrapper from '../components/ContentWrapper';
import CreateSessionForm from "../containers/CreateSessionForm";
import {connect} from "react-redux";
import {useHistory} from "react-router-dom";

const CreateSessionView = (props) => {

  // redirect user to player view if already logged in
  const history = useHistory();
  if (props.isLogged) history.push("/player");

  return (
    <ContentWrapper>
      creating a new session.<br />
      please choose your username.<br />
      <br />

      <CreateSessionForm/>
    </ContentWrapper>
  )
};

export default connect(
  state => ({
    isLogged: state.isLogged,
  })
)(CreateSessionView);
