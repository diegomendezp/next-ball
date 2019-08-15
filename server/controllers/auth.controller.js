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

module.exports.valorate = (req, res, next) => {
  const {
 drive, backhand, serve, volley, resistance 
} = req.body;
  User.findById({ _id: req.params.id })
    .then((user) => {
      user.statisticsAverage.drive.unshift(drive);
      user.statisticsAverage.backhand.unshift(backhand);
      user.statisticsAverage.serve.unshift(serve);
      user.statisticsAverage.volley.unshift(volley);
      user.statisticsAverage.resistance.unshift(resistance);
      user.save().then(() => {
        res.status(200).json(user);
      });
    })
    .catch((e) => {
      res.status(500).json({
        status: 'error',
        error: e.message,
      });
    });
};

module.exports.getProfile = (req, res, next) => {
  res.json(req.user);
};
