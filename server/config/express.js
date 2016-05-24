var express = require('express'),
    stylus = require('stylus'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    path = require('path'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    passport = require('passport');

module.exports = function (app, config) {
    function compile(str, path) {
        return stylus(str).set('filename', path);
    }

    app.set('views', [path.join(config.rootPath, '/server/views'), path.join(__dirname, '/server/views/partials')])
    app.set('view engine', 'jade');
    app.use(logger('dev'));
    app.use(cookieParser());
    app.use(bodyParser.urlencoded({ extended: false })); 
    app.use(bodyParser.json());
    app.use(session({ secret: 'galo doido', resave: false, saveUninitialized: false }));
    app.use(passport.initialize());
    app.use(passport.session())
    app.use(stylus.middleware({
        src: config.rootPath + '/public',
        compile: compile
    }));
    app.use(express.static(config.rootPath + '/public'));
}