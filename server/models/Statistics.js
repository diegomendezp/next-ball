const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const statisticsSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  drive: [{ type: Number, default: 5 }],
  backhand: [{ type: Number, default: 5 }],
  serve: [{ type: Number, default: 5 }],
  volley: [{ type: Number, default: 5 }],
  resistance: [{ type: Number, default: 5 }],
});

const Statistics = mongoose.model('Statistics', statisticsSchema);
module.exports = Statistics;
