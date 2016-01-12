import React, { PropTypes} from 'react';

import Login from './Login';
import PageList from './PageList';

export default class App extends React.Component {
  state = { user: USER };

  render() {
    return (
      <div>
        <div className="row">
          <div className="three columns">
            <h1>Bio</h1>

            <Login user={this.state.user} setUser={this.setUser} />

            <PageList user={this.state.user} history={this.props.history} />

          </div>
          <div className="nine columns">
            {this.props.children ? React.cloneElement(this.props.children, { user: this.state.user }) : null}
          </div>
        </div>
      </div>
    );
  }

  setUser = (user) => this.setState({ user: user });
}
