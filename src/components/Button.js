import React, {Component} from "react";

class Button extends Component {
  render() {
    return (
      <div className="Button">
        <button onClick={this.props.clickHandler}>
          {this.props.content}
        </button>
      </div>
    );
  }
}

export default Button;
