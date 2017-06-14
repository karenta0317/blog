const Post = require('./Schemas/postSchema');

const addPost = (title, text, date, tags) =>
  new Post({ title, text, date, tags }).save();
const getPostById = _id => Post.findOne({ _id }).exec();
const editPostById = (id, newtitle, newtext, newtags) =>
  Post.findOneAndUpdate({ _id: id }, { $set: {
    title: newtitle,
    text: newtext,
    tags: newtags,
  } }).exec();
const deletePostById = _id => Post.findOne({ _id }).remove().exec();
const getAllPosts = () => Post.find({}).exec();
const updateReplyById = (id, replyMessage) =>
  Post.findOneAndUpdate({ _id: id }, { $push: { reply: replyMessage } }).exec();
module.exports = {
  addPost,
  getPostById,
  editPostById,
  deletePostById,
  getAllPosts,
  updateReplyById,
};
