const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user.model');

module.exports.setup = (passport) => {
  passport.serializeUser((user, next) => {
    next(null, user);
  });

  passport.deserializeUser((id, next) => {
    User.findById(id)
      .then(user => next(null, user))
      .catch(next);
  });

  passport.use(
    'local-auth',
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
      },
      (email, password, next) => {
        User.findOne({ email })
          .then((user) => {
            if (!user) {
              next(null, false, 'Invalid email or password');
            } else {
              return user.checkPassword(password).then((match) => {
                if (!match) {
                  next(null, false, 'Invalid email or password');
                } else {
                  next(null, user);
                }
              });
            }
          })
          .catch(error => next(error));
      },
    ),
  );
};
