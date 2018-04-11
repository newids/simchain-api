'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var keyListSchema = new Schema({
  private_key: {
    type: String,
    required: "private_key"
  },
  public_key: {
    type: String,
    required: "public_key"
  },
  wif: {
    type: String,
    required: "wif"
  },
  wif_compressed: {
    type: String,
    required: "wif_compressed"
  },
  address: {
    type: String,
    required: "address"
  },
  node_number: {
    type: String,
    required: "node_number"
  },
  amount: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('keyLists', keyListSchema);
