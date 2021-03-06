const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const matchSchema = new Schema(
  {
    _author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    players: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    date: { type: Date, default: Date.now() },
    hour: String,
    location: {
      type: {
        type: String,
      },
      coordinates: [{ type: Number }],
    },
    result: String,
    winner: { type: Schema.Types.ObjectId, ref: 'User' },
    loser: { type: Schema.Types.ObjectId, ref: 'User' },
    finish: { type: Date, default: '2300-01-06 13:39:35.039' },
    closed: { type: Boolean, default: 'false' },
    ended: { type: Boolean, default: 'false' },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        ret.id = doc._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  },
);

const Match = mongoose.model('Match', matchSchema);
module.exports = Match;
