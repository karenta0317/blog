import ReactDOM from 'react-dom';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import HomePage from './components/homePage';
import EditorPage from './components/editorPage';
import PostPage from './components/postPage';
import NewPage from './components/newPage';


ReactDOM.render(
  <BrowserRouter>
    <div>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/add" component={NewPage} />
        <Route path="/post/:id" component={PostPage} />
        <Route path="/editor/:id" component={EditorPage} />
      </Switch>
    </div>
  </BrowserRouter>,
  document.getElementById('root'),
);
