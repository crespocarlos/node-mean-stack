var mongoose = require('mongoose'),
    crypto = require('crypto');

module.exports = function (config) {
    var db = mongoose.connect(config.db).connection;
    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open', function callback() {
        console.log('db open');
    });

    var userSchema = mongoose.Schema({
        firstName: String,
        lastName: String,
        userName: String,
        salt: String,
        hashed_pwd: String,
        roles: [String]
    });

    userSchema.methods = {
        authenticate: function (passwordToMatch) {
            return hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
        }
    }

    var User = mongoose.model('User', userSchema);

    User.find({}).exec(function (err, collection) {
        if (collection.length === 0) {
            var salt;

            salt = createSalt();
            User.create({
                firstName: 'Carlos',
                lastName: 'Crespo',
                userName: 'ccrespo',
                salt: salt,
                hashed_pwd: hashPwd(salt, 'ccrespo'),
                roles: ['admin']
            });

            salt = createSalt();
            User.create({
                firstName: 'Ana',
                lastName: 'Cavalcanti',
                userName: 'anacavalcantics',
                salt: salt,
                hashed_pwd: hashPwd(salt, 'anacavalcantics'),
                roles: []
            });

            salt = createSalt();
            User.create({
                firstName: 'Bruce',
                lastName: 'Dickinson',
                userName: 'bdickinson',
                salt: salt,
                hashed_pwd: hashPwd(salt, 'bdickinson')
            });
        }
    });
}

function createSalt() {
    return crypto.randomBytes(128).toString('base64');
}

function hashPwd(salt, pwd) {
    var hmac = crypto.createHmac('sha1', salt);
    hmac.setEncoding('hex');
    hmac.write(pwd);
    hmac.end()
    return hmac.read();
}