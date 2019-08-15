const createError = require("http-errors");

module.exports.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    throw createError(403);
  }
};
