const express = require('express');
const postHandler = require('../model/postHandler');

const router = express.Router();
function CurrentTime() {
  const time = new Date();
  const day = (time.getDate() < 10) ? `0${time.getDate()}` : time.getDate();
  const month = (time.getMonth() < 10) ? `0${time.getMonth() + 1}` : time.getMonth() + 1;
  const year = time.getFullYear();
  const hours = (time.getHours() < 10) ? `0${time.getHours()}` : time.getHours();
  const minutes = (time.getMinutes() < 10) ? `0${time.getMinutes()}` : time.getMinutes();
  const seconds = (time.getSeconds() < 10) ? `0${time.getSeconds()}` : time.getSeconds();
  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}
function getAll(req, res) {
  postHandler.getAllPosts()
  .then(posts => res.send(posts))
  .catch(err => console.log(err));
}

function getOne(req, res) {
  const pId = req.params.id;
  postHandler.getPostById(pId)
  .then(post => res.send(post))
  .catch(err => console.log(err));
}

function addOne(req, res) {
  const time = CurrentTime();
  const content = req.body;
  postHandler.addPost(content.title, content.text, time, content.tags)
  .then(post => res.send(post))
  .catch(err => console.log(err));

  console.log('add new post');
}

function editOne(req, res) {
  const pId = req.params.id;
  const content = req.body;
  postHandler.editPostById(pId, content.title, content.text, content.tags)
  .then(post => res.send(post))
  .catch(err => console.log(err));

  console.log(`update post: ${pId}`);
}
function deleteOne(req, res) {
  const pId = req.params.id;
  postHandler.deletePostById(pId)
  .catch(err => console.log(err));
  res.status(200).send();
  console.log(`delete post: ${pId}`);
}
function replyOne(req, res) {
  const pId = req.params.id;
  const replyM = {
    user: req.body.userName,
    body: req.body.text,
    date: CurrentTime(),
  };
  postHandler.updateReplyById(pId, replyM)
  .catch(err => console.log(err));
  res.status(200).send();
  console.log(`reply post: ${pId}`);
}
router.get('/posts', getAll);
router.post('/posts', addOne);
router.get('/posts/:id', getOne);
router.put('/posts/:id', editOne);
router.delete('/posts/:id', deleteOne);
router.post('/reply/:id', replyOne);

module.exports = router;
