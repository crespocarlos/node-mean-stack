var mongoose = require('mongoose');

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
    });

    var User = mongoose.model('User', userSchema);

    User.find({}).exec(function (err, collection) {
        if (collection.length === 0) {
            User.create({ firstName: 'Carlos', lastName: 'Crespo', userName: 'ccrespo' });
            User.create({ firstName: 'Ana', lastName: 'Cavalcanti', userName: 'anacavalcantics' });
            User.create({ firstName: 'Bruce', lastName: 'Dickinson', userName: 'bdickinson' });
        }
    });
}