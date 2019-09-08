const express = require('express');

const router = express.Router();
const match = require('../../controllers/match.controller');
const secure = require('../../middlewares/secure.mid');

router.get('/', match.getMatches);
router.get('/finish-matches', match.getFinishMatches);
router.get('/my-matches', secure.isAuthenticated, match.gethMyMatches);
router.get('/record/:id', secure.isAuthenticated, match.getRecord);
router.get('/:id', secure.isAuthenticated, match.getMatch);
router.post('/new', secure.isAuthenticated, match.newMatch);
router.post('/addPlayer/:playerId/:matchId', secure.isAuthenticated, match.addPlayerToMatch);
router.post('/endMatch/:matchId', secure.isAuthenticated, match.endMatch);
router.delete('/:id', secure.isAuthenticated, match.deleteMatch);

module.exports = router;
