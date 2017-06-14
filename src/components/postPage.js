import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import 'babel-polyfill';
import fetch from 'isomorphic-fetch';

class PostPage extends Component {
  constructor() {
    super();
    this.state = {
      postId: 0,
      postInfo: {},
      reply: [],
      replyName: '',
      replyText: '',
    };
    this.deletePost = this.deletePost.bind(this);
    this.handleChangeMessage = this.handleChangeMessage.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.replyMessage = this.replyMessage.bind(this);
  }
  componentDidMount() {
    const ID = this.props.match.params.id;
    fetch(`/api/posts/${ID}`)
      .then(res => res.json())
      .then(d => this.setState({ postInfo: d, postId: ID, reply: d.reply }))
      .catch(err => console.error(err));
  }
  deletePost() {
    fetch(`/api/posts/${this.state.postId}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
      }),
    })
    .catch(err => console.log(err));
    this.props.history.push('/');
  }
  handleChangeName(event) {
    this.setState({ replyName: event.target.value.substr(0, 15) });
  }
  handleChangeMessage(event) {
    this.setState({ replyText: event.target.value });
  }
  handleKeyPress(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
      this.replyMessage();
    }
  }
  replyMessage() {
    let name = '';
    if (this.state.replyName === '') {
      name = 'Anonymous';
    } else {
      name = this.state.replyName;
    }
    if (this.state.replyText !== '') {
      fetch(`/api/reply/${this.state.postId}/`, {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userName: name,
          text: this.state.replyText,
        }),
      });
      const newR = this.state.reply;
      const updateReplay = {
        user: name,
        date: 'update a second ago...',
        body: this.state.replyText,
      };
      newR.push(updateReplay);
      this.setState({
        replyText: '',
        replyName: '',
        reply: newR,
      });
    }
  }
  render() {
    const divStyle = {
      'word-wrap': 'break-word',
    };
    return (
      <div className="container">
        <div className="row">
          <div className="col s12">
            <h1>Sea of Posts</h1>
            <div className="divider" />
          </div>
          <div className="col s12">
            <div className="fixed-action-btn vertical">
              <a className="btn-floating btn-large pink darken-3">
                <i className="material-icons">menu</i>
              </a>
              <ul>
                <li>
                  <button className="btn-floating pink accent-1"onClick={() => this.deletePost()}>
                    <i className="material-icons">delete</i>
                  </button>
                </li>
                <li><Link className="btn-floating pink accent-1" to={`/editor/${this.state.postId}`}>
                  <i className="material-icons">edit</i>
                </Link></li>
                <li><Link className="btn-floating pink accent-1" to="/">
                  <i className="material-icons">home</i>
                </Link></li>
              </ul>
            </div>
          </div>
          <div className="col s12">
            <h4>{this.state.postInfo.title}</h4>
            <div className="right-align">{this.state.postInfo.date}</div>
            <div dangerouslySetInnerHTML={{ __html: this.state.postInfo.text }} />
            <br /><br />
            <div className="divider" />
          </div>
          <div className="col s6">
            {
              this.state.reply.map(r =>
                <div style={divStyle}>
                  <div>{r.user}</div>
                  <div className="right-align">{r.date}</div>
                  <div>{r.body}</div>
                  <br />
                  <div className="divider" />
                </div>,
              )
            }
            <input
              type="text" value={this.state.replyName}
              onChange={this.handleChangeName}
              placeholder="Name"
            />
            <textarea
              className="materialize-textarea"
              type="text"
              value={this.state.replyText}
              rows="3"
              onChange={this.handleChangeMessage}
              placeholder="Write a reply here..."
              onKeyPress={this.handleKeyPress}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default PostPage;
