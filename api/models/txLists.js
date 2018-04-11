'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var txListSchema = new Schema({
  height: {
    type: Number,
    required: true
  },
  hash_pointer: {
    type: String,
    unique: true,
    required: true
  },
  from: String,
  from_node: String,
  to: String,
  to_node: String,
  amount: {
    type: Number,
    default: 0
  },
  created_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('txLists', txListSchema);

 /***
 {
  "height": 0, // 무조건 0을 넣어주세요.
  "tx_number": 0, //제거했는데, swagger의 Example Value 화면에서만 보이네요. 무시하세요.
  "hash_pointer": "0", //무조건 0을 넣어주세요. 서버에서 처리합니다.
  "from": "string" , // 보내는 사람의 지갑 address
  "from_node": "string", // 보내는 사람의 node_number, 알 수 없으면 0
  "to": "string", // 받는 사람의 지갑 address
  "to_node": "string", // 받는 사람의 node_number, 알 수 없으면 0
  "amount": 0, // 송금액
  "created_date": "2018-04-11T02:21:35.299Z" // Date.now 또는 null
}
***/
