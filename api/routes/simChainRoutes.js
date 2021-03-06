'use strict';

module.exports = function (app) {
    var blockLists = require('../controllers/blockListsController');

    app.route('/block')
        .get(blockLists.list_blocks)
        .post(blockLists.create_a_block);

    app.route('/block/height/:id')
        .get(blockLists.read_a_block);

    app.route('/block/latest')
        .get(blockLists.read_a_latest_block);

    app.route('/block/genesis')
        .post(blockLists.createGenesisBlock);

    // txLists ----------------------
    var txLists = require('../controllers/txListsController');

    // app.route('/tx')
    //   .post(txLists.create_a_tx);

    app.route('/tx/height/:id')
        .get(txLists.read_a_tx_with_height);

    app.route('/tx/node/:id')
        .get(txLists.read_a_tx_with_node);

    app.route('/tx/from/:id')
        .get(txLists.read_txs_from);

    app.route('/tx/balance/:id')
        .get(txLists.get_address_balance);

    app.route('/tx/requests')
        .get(txLists.list_all_tx_requests)
        .post(txLists.create_a_tx_requests);
};
