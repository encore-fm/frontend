import React, {Component} from "react";

class NameForm extends Component {
  render() {
    return (
      <div className="NameForm">
        <form>
          <input
            placeholder="Username"
            onChange={this.props.changeHandler}
          />
        </form>
      </div>
    );
  }
}

export default NameForm;
