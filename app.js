const express = require('express');
const cookieSession = require('cookie-session');
const passport = require('passport');
const path = require('path');
const app = express();
require('./services/passport.service');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieSession({
    name: 'tuto-session',
    keys: ['key1', 'key2']
  }))

passport.use(require('./services/passport.service'));

app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "views")));

app.use('/auth', require('./services/auth.service').router);

app.get('/',(req,res)=>{
    if(req.token){
        jwt.verify(req.token, config.secretkey, (err, user) => {
            if (err) {
                res.send('Error Not Logged In!');
            } else {
                res.json(user);
            }
        });
    } else {
        res.send('Not Logged In!');
    }
})

app.listen(3001,()=>{
    console.log("Listening on port 3001...");
});