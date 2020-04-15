import React, {Component} from "react";
import {createSession} from "../actions/user";
import {connect} from "react-redux";
import NameForm from "../components/NameForm";
import Button from "../components/Button";

class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      adminName: ''
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const {isLogged, user} = this.props;

    if (isLogged)
      window.location.href = user.authUrl;
  }

  render() {
    return (
      <div className="Create">
        <NameForm
          changeHandler={this.handleChange}
        />
        <Button
          clickHandler={this.handleCreate}
          content="Start the party!"
        />
        {this.renderError()}
      </div>
    )
  }

  renderError = () => {
    const {error} = this.props;

    if (!error.error)
      return null;

    return (
      <div className="error">
        <b>{`${error.error}: ${error.description}`}</b>
      </div>
    );
  };

  handleChange = event => {
    this.setState({adminName: event.target.value});
  };

  handleCreate = event => {
    this.props.dispatch(createSession(this.state.adminName));
  };
}

// maps redux state to component props
export default connect(
  state => ({
    isLogged: state.isLogged,
    user: state.user,
    error: state.error
  })
)(Create);
