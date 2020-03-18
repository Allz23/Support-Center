const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const passportMongoose = require("passport-local-mongoose");

const User = require("../models/User");
// User session validation
passport.use(
  "localLogin",
  new localStrategy(
    {
      usernameField: "username",
      passwordField: "password"
    },
    async (username, password, done) => {
      const user = await User.findOne({ username: username });

      if (!user) {
        return done(null, false);
      } else {
        if (user.password === password) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (_id, done) => {
  await User.findById(_id, (err, user) => {
    if (err) {
      console.log(err);
      return done(null, false);
    } else {
      return done(null, user);
    }
  });
});
