const express = require('express');

const router = express.Router();
const Match = require('../models/match.model');
const User = require('../models/user.model');
const transport = require('../configs/nodemailer.config');
const { winnerTemplate, loserTemplate } = require('../templates/template');

// Match.find({ roomId: { $in: [req.params.id] } })

module.exports.getMatches = (req, res, next) => {
  Match.find({})
    .populate('_author')
    .populate('players')
    .then((matches) => {
      res.status(200).json(matches);
    })
    .catch((e) => {
      res.status(500).json({
        status: 'error',
        error: e.message,
      });
    });
};

module.exports.getFinishMatches = (req, res, next) => {
  const date = Date.now();
  Match.find({
    finish: {
      $gt: '2010-01-01 13:39:35.039',
      $lt: `${date.getTime()}`,
    },
  })
    .populate('_author')
    .then((matches) => {
      res.status(200).json(matches);
    })
    .catch((e) => {
      res.status(500).json({
        status: 'error',
        error: e.message,
      });
    });
};

module.exports.gethMyMatches = (req, res, next) => {
  const { id } = req.user;
  Match.find({
    ended: false,
    players: {
      $elemMatch: {
        $eq: id,
      },
    },
  })
    .populate('_author')
    .populate('players')
    .then((matches) => {
      res.status(200).json(matches);
    })
    .catch((e) => {
      res.status(500).json({
        status: 'error',
        error: e.message,
      });
    });
};

module.exports.newMatch = (req, res, next) => {
  const players = [];
  const { id } = req.user;
  const {
    lat, lng, hour, date,
  } = req.body;
  players.push(id);
  const location = {
    type: 'Point',
    coordinates: [Number(lat), Number(lng)],
  };
  const newMatch = new Match({
    _author: id,
    players,
    hour,
    date,
    location,
  });

  newMatch.save((err) => {
    if (err) {
      return res.status(500).json(err);
    }
    if (newMatch.errors) {
      return res.status(400).json(newMatch);
    }

    return res.status(200).json(newMatch);
  });
};

module.exports.addPlayerToMatch = (req, res, next) => {
  Match.findByIdAndUpdate(
    req.params.matchId,
    {
      $push: {
        players: req.params.playerId,
      },
      closed: true,
    },
    {
      new: true,
    },
  )
    .then((match) => {
      res.status(200).json(match);
    })
    .catch((e) => {
      res.status(500).json({
        status: 'error',
        error: e.message,
      });
    });
};

module.exports.getMatch = (req, res, next) => {
  const { id } = req.params;
  Match.findById(id)
    .populate('_author')
    .then((match) => {
      res.status(200).json(match);
    })
    .catch((e) => {
      res.status(500).json({
        status: 'error',
        error: e.message,
      });
    });
};

module.exports.deleteMatch = (req, res) => {
  Match.findByIdAndRemove(req.params.id).then(e => res.status(200).json({
    message: 'Match removed successfully!',
  }));
};

module.exports.endMatch = (req, res) => {
  const { winner, loser } = req.body;
  Match.findByIdAndUpdate(
    req.params.matchId,
    {
      winner: winner.id,
      loser: loser.id,
      ended: true,
      finish: Date.now(),
    },
    {
      new: true,
    },
  )
    .then((e) => {
      res.status(200).json(e);
    })
    .catch((e) => {
      res.status(500).json({
        status: 'error',
        error: e.message,
      });
    });
};

module.exports.getRecord = (req, res, next) => {
  const { id } = req.params;
  Match.find({
    ended: true,
    players: {
      $elemMatch: {
        $eq: id,
      },
    },
  })
    .populate('_author')
    .then((matches) => {
      res.status(200).json(matches);
    })
    .catch((e) => {
      res.status(500).json({
        status: 'error',
        error: e.message,
      });
    });
};

module.exports.setWinner = (req, res) => {
  const { winner, loser } = req.body;
  User.findById({
    _id: winner,
  })
    .then((user) => {
      user.wonMatches++;
      user.points += 10;
      // if (user.points > 100) {
      //   user.points = 0;
      //   user.league += 1;
      user.save().then(() => {
        transport
          .sendMail({
            to: user.email,
            subject: 'Head2Head',
            html: winnerTemplate(user.username, loser.username),
          })
          .then(() => res.status(200).json(user));
      });
    })
    .catch((e) => {
      res.status(500).json({
        status: 'error',
        error: e.message,
      });
    });
};

module.exports.setLoser = (req, res) => {
  const { winner, loser } = req.body;
  User.findById({
    _id: loser,
  })
    .then((user) => {
      user.lostMatches++;
      if (user.points > 0) {
        user.points -= 10;
      }
      // if (user.league > 0) {
      //   if (user.points <= 0) {
      //     user.points = 50;
      //     user.league -= 1;
      //   }
      // }
      user.save().then(() => {
        transport
          .sendMail({
            to: user.email,
            subject: 'Head2Head',
            html: loserTemplate(winner.username, user.username),
          })
          .then(() => res.status(200).json(user));
      });
    })
    .catch((e) => {
      res.status(500).json({
        status: 'error',
        error: e.message,
      });
    });
};
