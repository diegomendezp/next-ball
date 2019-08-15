const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, default: Date.now() },
    comment: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
