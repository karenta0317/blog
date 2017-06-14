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
    return (
      <div>
        <div >
          <button
            type="submit"
            onClick={() => this.handleSubmit()}
          >Submit</button>
          <button type="submit"><Link to="/">Cancel</Link></button>
        </div>
        <div>
          <input
            type="text"
            value={this.state.title}
            onChange={this.handleTitleOnChange}
            placeholder="New Title"
          />
        </div>
        <div>
          <input
            type="text"
            value={this.state.tags}
            onChange={this.handleTagsOnChange}
            placeholder="add tags here"
          />
        </div>
        <div>
          <ReactQuill theme="snow" value={this.state.text} onChange={this.handleTextOnChange} />
        </div>
      </div>
    );
  }
}
export default EditorPage;
