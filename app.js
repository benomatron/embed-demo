var bodyParser = require('body-parser');
var express = require("express");
var flash = require('connect-flash');
var inspect = require('inspect');
var localStrategy = require('passport-local');
var passport = require('passport');
var methodOverride = require('method-override');
var mongoose = require('mongoose');
var request = require('request');

var User = require('./models/user');

var app = express();
var indexRoutes = require('./routes/index');
var seedDB = require('./seedDB');

app.use(require('express-session')({
    secret: "potato gunslinger moustache",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize())
app.use(passport.session())

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(bodyParser.urlencoded({extended: true}));
app.use(flash());
app.use(methodOverride('_method'));

app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.errMsgs= req.flash('error');
    res.locals.infoMsgs= req.flash('info');
    next();
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(indexRoutes);
app.set("view engine", "ejs");

mongoose.connect('mongodb://127.0.0.1/truck77');

//seedDB()

app.listen(3000, "127.0.0.1", function() {
    console.log('hello');
});
