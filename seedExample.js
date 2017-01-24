var mongoose = require('mongoose');
var User = require('./models/user');
var Org = require('./models/org');

var users = [
    {username: 'ben-demos', password: '123456', orgName: 'ben-demos', orgId: 123, dashId: 456, embedSecret: 'supersecretthingforyou'}
]


function seedDB() {
    // create users
    users.forEach(function (ux) {
        User.findOne({username: ux.username}, function (err, user) {
            if (err) {
                console.log(err);
            } else if (!user) {
                var newUser = new User({username: ux.username});
                User.register(newUser, ux.password, function (err, user) {
                    if (err) {
                        console.log(err)
                    } else {
                        Org.create({name: ux.orgName, embedSecret: ux.embedSecret, orgId: ux.orgId, dashId: ux.dashId, user: user}, function (err, org) {
                            if (err) {
                                console.log(err)
                            } else {
                                org.save()
                            }
                        });
                    }
                });
            }
        });
    });
}

module.exports = seedDB;
