import React from 'react';
import * as API from '../api';

import { Link } from 'react-router';

export default class PageList extends React.Component {
  state = {
    loaded: false,
    pages: {},
    newPageTitle: '',
  };

  componentDidMount() {
    API.pages.on('value', snapshot => this.setState({
      pages: snapshot.exportVal(),
      loaded: true,
    }));
  }

  render() {
    let items = this.state.loaded ? Object.keys(this.state.pages).map(id => {
      return (
        <li key={id}>
          <Link to={'/page/' + id } params={ { id: id } }>{this.state.pages[id].title}</Link>
        </li>
      );
    }) : [<li key="loading"> <em>Loading...</em> </li>];

    return (
      <div>
        <ul>{items}</ul>
        { this.props.user ?
            <input type="text"
              className="u-full-width"
              value={this.state.newPageTitle}
              placeholder="New Page Title"
              onChange={this.update}
              onKeyPress={this.createPage}
            /> : null
        }
      </div>
    );
  }

  update = evt => this.setState({ newPageTitle: evt.target.value });
  createPage = evt => {
    if (evt.charCode !== 13) return;
    var id = API.pages.push({ title: this.state.newPageTitle });
    this.props.history.pushState(null, '/page/' + id.key());
    this.setState({ newPageTitle: '' });
  };
}
