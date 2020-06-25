const express = require('express');
const passport = require('passport');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('trust proxy', 1);

app.use(
  require('express-session')({
    secret: require('./config.json').secretKey,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      maxAge: 60 * 60 * 1000 * 24 * 365,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(require('./middleware/passport.service'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'views')));

app.use('/auth', require('./api/auth'));
app.use('/', require('./api/user'));

app.listen(3001, () => {
  console.log('Listening on port 3001...');
});
