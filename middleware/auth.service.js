function isAuthenticated(req, res, next) {
    if(req.session.passport){
        next();
    } else {
        res.redirect('/auth/login');
    }
}

module.exports = isAuthenticated;