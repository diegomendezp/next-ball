const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;
const EMAIL_PATTERN = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const PASSWORD_PATTERN = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
const URL_PATTERN = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
const SALT_WORK_FACTOR = 10;

const userSchema = new Schema(
  {
    username: String,
    email: {
      type: String,
      required: 'Email is required',
      unique: true,
      lowercase: true,
      trim: true,
      match: [EMAIL_PATTERN, 'Invalid email pattern'],
    },
    password: {
      type: String,
      required: 'Password is required',
      match: [
        PASSWORD_PATTERN,
        'Passwords must contain at least six characters, including uppercase, lowercase letters and numbers.',
      ],
    },
    image: {
      type: String,
      match: [URL_PATTERN, 'Invalid avatar URL pattern'],
      default:
        'https://e00-marca.uecdn.es/assets/multimedia/imagenes/2018/06/10/15286487701441.jpg',
    },
    description: { type: String, default: '' },
    wonMatches: { type: Number, default: 0 },
    lostMatches: { type: Number, default: 0 },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    statisticsAverage: {
      drive: [{ type: Number, default: 5 }],
      backhand: [{ type: Number, default: 5 }],
      serve: [{ type: Number, default: 5 }],
      volley: [{ type: Number, default: 5 }],
      resistance: [{ type: Number, default: 5 }],
    },
    valorated: [String],
    points: { type: Number, default: 0 },
    league: { type: String, default: '0' },
    notifications: [],
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        ret.id = doc._id;
        delete ret._id;
        delete ret.__v;
        delete ret.password;
        return ret;
      },
    },
  },
);

userSchema.pre('save', function (next) {
  const user = this;

  if (!user.isModified('password')) {
    next();
  } else {
    bcrypt
      .genSalt(SALT_WORK_FACTOR)
      .then(salt => bcrypt.hash(user.password, salt).then((hash) => {
          user.password = hash;
          next();
        }),)
      .catch(next);
  }
});

userSchema.methods.checkPassword = function (password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
