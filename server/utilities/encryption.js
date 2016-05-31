var crypto = require('crypto');

exports.createSalt = function () {
    return crypto.randomBytes(128).toString('base64');
};

exports.hashPwd = function (salt, pwd) {
    if (!pwd) { return ''; }

    var hmac = crypto.createHmac('sha1', new Buffer(salt, 'utf-8'));
    hmac.setEncoding('hex');
    hmac.write(pwd);
    hmac.end()
    return hmac.read();
};