var express = require('express'),
    stylus = require('stylus'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    path = require('path'),
    mongoose = require('mongoose');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

function compile(str, path) {
    return stylus(str).set('filename', path);
}

app.set('views', [path.join(__dirname, '/server/views'), path.join(__dirname, '/server/views/partials')])
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(stylus.middleware({
    src: __dirname + '/public',
    compile: compile
}));
app.use(express.static(__dirname + '/public'));

var db = mongoose.connect('mongodb://localhost/multivision').connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function callback() {
    console.log('db open');
});

var messageSchema = mongoose.Schema({ message: String });
var Message = mongoose.model('Message', messageSchema);
var mongoMessage;
Message.findOne().exec(function (err, messageDoc) {
    mongoMessage = messageDoc.message;
});


app.get('/partials/:partialPath', function (req, res) {
    res.render('partials/' + req.params.partialPath);
});

app.get('/', function (req, res) {
    res.render('index', {
        mongoMessage: mongoMessage
    });
});

var port = 3000;
app.listen(port);
console.log('escutando a porta ' + port);