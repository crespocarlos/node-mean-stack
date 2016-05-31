var mongoose = require('mongoose'),
    userModel = require('../models/User');

module.exports = function (config) {
    var db = mongoose.connect(config.db).connection;
    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open', function callback() {
        console.log('db open');
    });

    userModel.createDefaultUsers();
}

