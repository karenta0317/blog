const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: { type: String, required: true },
  text: { type: String, required: true },
  date: { type: String, required: true },
  // modify tags array
  tags: { type: String },
  reply: [{
    user: { type: String },
    body: { type: String },
    date: { type: String },
  }],
});

const Post = mongoose.model('post', postSchema);
module.exports = Post;
