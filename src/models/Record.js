const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
  amount: Number,
  type: {
    type: String,
    enum: ['income', 'expense']
  },
  category: String,
  date: Date,
  notes: String,
  isDeleted: {
    type: Boolean,
    default: false
  },
  flagged: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Record', recordSchema);