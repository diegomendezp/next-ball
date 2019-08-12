require('dotenv').config();

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const logger = require('morgan');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');

const flash = require('connect-flash');

require('./configs/db.config');
// require('./configs/passport.config').setup(passport);

const app_name = require('./package.json').name;
const debug = require('debug')(
  `${app_name}:${path.basename(__filename).split('.')[0]}`,
);

const app = express();

// Middleware Setup
const whitelist = ['http://localhost:3000'];
const corsOptions = {
  origin(origin, callback) {
    const originIsWhitelisted = whitelist.indexOf(origin) !== -1;
    callback(null, originIsWhitelisted);
  },
  credentials: true,
};

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(
  session({
    secret: 'Next-ball-secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 1000,
    },
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 24 * 60 * 60,
    }),
  }),
);
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));

// default value for title local
app.locals.title = 'Nunc-app';

app.use(flash());

app.use(require('./routes'));

app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// finally, let's start our server...
const server = app.listen(process.env.PORT || 3001, () => {
  console.log(`Listening on port ${server.address().port}`);
});

module.exports = app;
