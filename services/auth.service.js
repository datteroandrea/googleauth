const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/login',(req,res)=>{
    res.render('login');
});

router.get('/google',
  passport.authenticate('google', { scope:
  	[ 'email', 'profile' ] }
));

router.get('/google/failure',(req,res)=>{
    res.redirect('/auth/login');
});

router.get('/google/ok', isAuthenticated, (req,res)=>{
    res.send('Authentication went OK!');
});
 
router.get( '/google/callback',
    passport.authenticate( 'google', { failureRedirect: '/auth/google/failure', successRedirect: '/auth/google/ok' }));

function isAuthenticated(req, res, next) {
    if(req.user){
        next();
    } else {
        res.send('Auth Error!');
    }
}

module.exports =  {
    router,
    isAuthenticated
}