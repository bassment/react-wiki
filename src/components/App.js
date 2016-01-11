import React from 'react';

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
            Login

            PageList
          </div>
          <div className="nine columns">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}
