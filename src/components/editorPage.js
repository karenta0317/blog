import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import 'babel-polyfill';
import fetch from 'isomorphic-fetch';
import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css';
import ReactQuill from 'react-quill';
// import 'quill/dist/quill.snow.css';

class EditorPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postId: 0,
      title: '',
      text: '',
      tags: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTextOnChange = this.handleTextOnChange.bind(this);
    this.handleTitleOnChange = this.handleTitleOnChange.bind(this);
    this.handleTagsOnChange = this.handleTagsOnChange.bind(this);
  }
  componentDidMount() {
    const ID = this.props.match.params.id;
    fetch(`/api/posts/${ID}`)
    .then(res => res.json())
    .then(d => this.setState({ title: d.title, text: d.text, tags: d.tags, postId: ID }))
    .catch(err => console.error(err));
  }
  handleSubmit() {
    fetch(`/api/posts/${this.state.postId}`, {
      method: 'put',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        title: this.state.title,
        text: this.state.text,
        tags: this.state.tags,
      }),
    })
    .catch(err => console.error(err));
    this.props.history.push(`/post/${this.state.postId}`);
  }
  handleTitleOnChange(event) {
    this.setState({ title: event.target.value });
  }
  handleTextOnChange(value) {
    this.setState({ text: value });
  }
  handleTagsOnChange(event) {
    this.setState({ tags: event.target.value });
  }

  render() {
    const editorStyle = {
      height: '400px',
    };
    return (
      <div className="container">
        <div className="row">
          <div className="col s12">
            <div className="fixed-action-btn vertical">
              <a className="btn-floating btn-large pink darken-3">
                <i className="material-icons">menu</i>
              </a>
              <ul>
                <li>
                  <button
                    className="btn-floating pink accent-1"
                    type="submit"
                    onClick={() => this.handleSubmit()}
                  >
                    <i className="material-icons">done</i>
                  </button>
                </li>
                <li><Link className="btn-floating pink accent-1" to="/">
                  <i className="material-icons">cancel</i>
                </Link></li>
              </ul>
            </div>
          </div>
          <div className="col s12">
            <input
              type="text"
              value={this.state.title}
              onChange={this.handleTitleOnChange}
              placeholder="New Title"
            />
          </div>
          <div className="col s12">
            <input
              type="text"
              value={this.state.tags}
              onChange={this.handleTagsOnChange}
              placeholder="add tags here"
            />
          </div>
          <div className="col s12" style={editorStyle}>
            <ReactQuill theme="snow" value={this.state.text} onChange={this.handleTextOnChange} />
          </div>
        </div>
      </div>
    );
  }
}
export default EditorPage;
