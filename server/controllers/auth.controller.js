const createError = require('http-errors');
const passport = require('passport');
const User = require('../models/user.model');

module.exports.register = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user) throw createError(409, 'User already registered');
      else return new User(req.body).save();
    })
    .then(user => res.status(201).json(user))
    .catch(next);
};

module.exports.authenticate = (req, res, next) => {
  passport.authenticate('local-auth', (error, user, message) => {
    if (error) next(error);
    else if (!user) throw createError(401, message);
    else {
      req.login(user, (error) => {
        if (error) next(error);
        else res.status(201).json(user);
      });
    }
  })(req, res, next);
};

module.exports.logout = (req, res, next) => {
  req.logout();
  res.status(204).json();
};

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .sort({ points: -1 })
    .then(user => res.status(200).json(user));
};
