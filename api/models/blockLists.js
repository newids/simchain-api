'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var blockListSchema = new Schema({
  height: {
    type: Number,
      unique: true,
    required: 'height'
  },
  node_number: {
    type: String,
    required: 'node_number'
  },
  address: {
    type: String,
    required: 'address'
  },
  prev_hash: {
    type: String,
    required: 'prev_hash'
  },
  merkle_root: {
    type: String,
    required: 'merkle_root'
  },
  time: {
    type: String,
    default: 'time'
  },
  nbits: {
    type: String,
    required: 'nbits'
  },
  nonce: {
    type: String,
    required: 'nonce'
  },
  created_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('blockLists', blockListSchema);
