const express = require("express");
const config = require("./config.json");
const cors = require("cors");
var session = require("express-session");
const passport = require("passport");
const path = require("path");
const auth = require("./middleware/auth.service");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("trust proxy", 1);
app.use(cors());

app.use(
  session({
    secret: config.secretKey,
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

passport.use(require("./middleware/passport.service"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "views")));

app.use("/auth", auth.router);

app.get("/", auth.isAuthenticated, (req, res) => {
  res.json(req.session.passport);
});

app.listen(3001, () => {
  console.log("Listening on port 3001...");
});
