var jwt = require('jwt-simple');
var passport = require('passport');
var router = require('express').Router({mergeParams: true})

var User = require('../models/user');
var Org = require('../models/org');
var isLoggedIn = require('../middleware').isLoggedIn;

var BASE_URL =  'https://embed.chartio.com/d/';

router.get('/', function (req, res) {
    res.render('landing');
});

router.get('/login', function (req, res) {
    res.render('login');
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login'
}), function (req, res) {
    console.log('a thing');
});

router.get('/logout', function (req, res) {
    req.logout();
    req.flash('info', 'goodbye');
    res.redirect('/login');
});

router.get("/dashboard", isLoggedIn, function(req, res) {
    var user = req.user;
    Org.findOne({user: user}, function (err, org) {
        if (err) {
            res.send('Could not find embedded dashboard for user');
        } else {
            var now = parseInt(new Date().getTime() / 1000);
            var payload = {
                'iat': now,
                'nbf': now,
                'exp': now + 86400, //one day from now.
                'organization': org.orgId,
                'dashboard': org.dashId
                //'env': {"MYVAR": 42}
                //};
            };
            var token = jwt.encode(payload, org.embedSecret, 'HS256');
            var baseUrl = BASE_URL + org.dashId;
            //console.log('oI = ', org.orgId);
            //console.log('dI = ', org.dashId);
            //console.log('es = ', org.embedSecret);
            //console.log('BU = ', baseUrl);
            res.render("dashboard", {BASE_URL: baseUrl, token: token});
        }
    });
});

module.exports = router;
