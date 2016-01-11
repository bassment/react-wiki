import React from 'react';

import Login from './Login';
import PageList from './PageList';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: USER,
    };
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="three columns">
            <h1>Wiki</h1>

            <Login user={this.state.user} setUser={this.setUser} />

            <PageList user={this.state.user} />
          </div>
          <div className="nine columns">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }

  setUser = (user) => this.setState({ user: user });
}
