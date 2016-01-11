import React from 'react';
import ReactDOM from 'react-dom';
import * as API from '../api';

export default class Login extends React.Component {
  render() {
    if (this.props.user) {
      return (
        <div className="row">
          <p>Hi {this.props.user.username}!</p>
          <p><button onClick={this.signout}>Sign Out</button></p>
        </div>
      );
    }

    return (
      <div className="row">
        <p><input type="text" className="u-full-width" placeholder="Username" ref="username" /></p>
        <p><input type="password" className="u-full-width" placeholder="Password" ref="password" /></p>
        <p>
          <button onClick={this.signin}>Sign In</button>
          <button onClick={this.signup}>Sign Up</button>
        </p>
      </div>
    );
  }

  signin = evt => this.sign('in', evt);
  signup = evt => this.sign('up', evt);
  sign = (name, evt) => {
    var username = ReactDOM.findDOMNode(this.refs.username).value;
    var password = ReactDOM.findDOMNode(this.refs.password).value;

    API['sign' + name](username, password).then(data => this.props.setUser(data.user));
  };

  signout = evt => API.signout().then(data => this.props.setUser(null));
}
