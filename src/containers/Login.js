/**
 * Created by mehulcse on 09/12/17.
 */
import React, { Component } from "react";
import { login } from "./../actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: ''
    };
  }

  onLogin = () => {
    this.props.history.push("/dashboard");
  };

  render() {
    return (
      <div className="main-search">
        <form onSubmit={(e) => {
          e.preventDefault();
          this.props.login(this.state.userName, this.state.password, this.onLogin)
        }}>
          <input type="text"
                 value={this.state.userName}
                 onChange={(e) => {
                   e.preventDefault();
                   this.setState({ userName: e.target.value });
                 }}/>
          <input type="password"
                 value={this.state.password}
                 onChange={(e) => {
                   e.preventDefault();
                   this.setState({ password: e.target.value });
                 }}/>
          <button type="submit" onClick={(e) => {
            e.preventDefault();
            this.props.login(this.state.userName, this.state.password, this.onLogin)
          }}
                  disabled={!(this.state.userName && this.state.userName)}>
            Login
          </button>
        </form>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ login }, dispatch);
}

export default connect(null, mapDispatchToProps)(Login);