var mongoose = require('mongoose'),
    encryption = require('../utilities/encryption');

var userSchema = mongoose.Schema({
    firstName: { type: String, required: '{PATH} is required!' },
    lastName: { type: String, required: '{PATH} is required!' },
    userName: {
        type: String,
        required: '{PATH} is required!',
        unique: true
    },
    salt: { type: String, required: '{PATH} is required!' },
    hashed_pwd: { type: String, required: '{PATH} is required!' },
    roles: [String]
});

userSchema.methods = {
    authenticate: function (passwordToMatch) {
        return encryption.hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
    }
}

var User = mongoose.model('User', userSchema);

function createDefaultUsers() {
    User.find({}).exec(function (err, collection) {
        if (collection.length === 0) {
            var salt;

            salt = encryption.createSalt();
            User.create({
                firstName: 'Carlos',
                lastName: 'Crespo',
                userName: 'ccrespo',
                salt: salt,
                hashed_pwd: encryption.hashPwd(salt, 'ccrespo'),
                roles: ['admin']
            });

            salt = encryption.createSalt();
            User.create({
                firstName: 'Ana',
                lastName: 'Cavalcanti',
                userName: 'anacavalcantics',
                salt: salt,
                hashed_pwd: encryption.hashPwd(salt, 'anacavalcantics'),
                roles: []
            });

            salt = encryption.createSalt();
            User.create({
                firstName: 'Bruce',
                lastName: 'Dickinson',
                userName: 'bdickinson',
                salt: salt,
                hashed_pwd: encryption.hashPwd(salt, 'bdickinson')
            });
        }
    });
}

exports.createDefaultUsers = createDefaultUsers;