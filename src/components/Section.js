import React from 'react';
import ReactDOM from 'react-dom';
import { markdown } from 'markdown';
import * as API from '../api';

class Section extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getState(props);
  }

  componentDidMount() {
    this.componentWillReceiveProps(this.props);
  }

  componentWillReceiveProps(nextProps) {
    var state = this.getState(nextProps);

    this.makeLinks(state.html, html => {
      state.html = html;
      this.setState(state);
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.editing) {
      ReactDOM.findDOMNode(this.refs.editor).focus();
    }
  }

  getState = props => ({
    locked: props.user && props.section.editor && props.user.username !== props.section.editor,
    editing: props.user && props.user.username === props.section.editor,
    content: props.section.content,
    html: props.section.content ? markdown.toHTML(props.section.content) : '',
  });

  render() {
    let content;

    if (this.state.editing) {
      content = <textarea
        className="twelve columns"
        ref="editor"
        defaultValue={this.state.content}
        onChange={this.changeContent}
        onBlur={this.save}
        />;
    } else {
      content = <span dangerouslySetInnerHTML={ { __html: this.state.html } }/>;
    }

    let classes = ['row', 'section'];

    if (this.state.editor) classes.push('editing');
    if (this.props.user) classes.push(this.state.locked ? 'locked' : 'editable');

    return (
      <section onClick={this.startEditing} className={classes.join(' ')}>
        {content}
      </section>
    );
  }

  changeContent = evt => {
    this.setState({
      content: evt.target.value,
    });
  };

  save = evt => {
    this.setState({ editing: false });

    API.pages.child(this.props.path).update({
      editor: null,
      content: this.state.content || null,
    });
  };

  startEditing = evt => {
    if (evt.target.tagName === 'A') {
      var href = evt.target.getAttribute('href');
      if (href.indexOf('/page/') > -1) {
        this.props.history.pushState(null, href);
        return evt.preventDefault();
      }

      return;
    }

    if (!this.props.user || this.state.editing || this.state.locked) return;
    this.setState({ editing: true });
    API.pages.child(this.props.path).update({
      editor: this.props.user.username,
    });
  };

  makeLinks(html, callback) {
    const anchor = /\[\[(.*)\]\]/g;

    API.pages.once('value', snapshot => {
      let pages = snapshot.exportVal();
      let keys = Object.keys(pages);

      callback(html.replace(anchor, (match, anchorText) => {
        for (let key of keys)
          if (pages[key].title === anchorText.trim())
            return `<a href="/page/${key}">${anchorText}</a>`;
      }));
    });
  }
}

export default Section;
