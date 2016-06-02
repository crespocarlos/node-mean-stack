var mongoose = require('mongoose'),
    userModel = require('../models/User'),
    courseModel = require('../models/Course');

module.exports = function (config) {
    var db = mongoose.connect(config.db).connection;
    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open', function callback() {
        console.log('db open');
    });

    userModel.createDefaultUsers();
    courseModel.createDefaultCourses();
}

