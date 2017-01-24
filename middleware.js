var midObj = {
    isLoggedIn: function (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        } else {
            console.log('not logged in');
            req.flash("error", 'please login');
            res.redirect('/login');
        }
    }
}

module.exports = midObj;
