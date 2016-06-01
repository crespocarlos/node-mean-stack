var User = require('mongoose').model('User'),
    encryption = require('../utilities/encryption');

exports.checkUserNameAvailable = function (req, res) {
    User.findOne({ userName: req.params.userName }, function (err, user) {
        res.send(!user);
    });
};

exports.getUsers = function (req, res) {
    User.find({}).exec(function (err, collection) {
        res.send(collection);
    });
};

exports.createUser = function (req, res, next) {
    var userData = req.body;
    userData.userName = userData.userName.toLowerCase();
    userData.salt = encryption.createSalt();
    userData.hashed_pwd = encryption.hashPwd(userData.salt, userData.password);

    User.create(userData, function (err, user) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                err = new Error('duplicated username');
            }
            res.status(400);
            return res.send({ reason: err.toString() });
        }

        req.logIn(user, function (err) {
            if (err) { return next(err); }
            res.send(user);
        });
    });
};

exports.updateUser = function (req, res) {
    var userUpdates = req.body;

    if (req.user._id != userUpdates._id && !req.user.hasRole('admin')) {
        res.status(403);
        return res.end();
    }

    req.user.firstName = userUpdates.firstName;
    req.user.lastName = userUpdates.lastName;
    req.user.userName = userUpdates.userName.toLowerCase();

    if (userUpdates.password && userUpdates.password.length > 0) {
        userUpdates.salt = encryption.createSalt();
        userUpdates.hashed_pwd = encryption.hashPwd(userUpdates.salt, userData.password);
    }

    req.user.save(userUpdates, function (err, user) {
        if (err) {
            res.status(400);
            return res.send({ reason: err.toString() });
        }

        res.send(req.user);
    });
}


