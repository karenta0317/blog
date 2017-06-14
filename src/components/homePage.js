import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import 'babel-polyfill';
import fetch from 'isomorphic-fetch';
import Truncate from 'react-truncate';

class HomePage extends Component {
  constructor() {
    super();
    this.state = {
      pageTitle: 'Sea of Posts',
      posts: [],
    };
  }
  componentDidMount() {
    fetch('/api/posts')
      .then(res => res.json())
      .then(d => this.setState({ posts: d }))
      .catch(err => console.error(err));
  }
  render() {
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
                <li><Link className="btn-floating pink accent-1"to="/add">
                  <i className="material-icons">add</i>
                </Link></li>
              </ul>
            </div>
          </div>
          <div className="col s12">
            {
              this.state.posts.map(post =>
                <div>
                  <h4 className="left-align">{post.title}</h4>
                  <div className="right-align">{post.date}</div>
                  <br />
                  <Truncate lines={5} ellipsis={<span>...</span>}>
                    <div className="left-align" dangerouslySetInnerHTML={{ __html: post.text }} />
                  </Truncate>
                  <br /><br />
                  <div className="right-align"><Link to={`/post/${post._id}`}>Read More....</Link></div>
                  <br />
                  <div className="divider" />
                </div>,
              )
            }
          </div>
        </div>
      </div>
    );
  }

}

export default HomePage;
