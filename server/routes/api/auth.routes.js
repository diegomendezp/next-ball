const express = require('express');

const router = express.Router();
const auth = require('../../controllers/auth.controller');

router.post('/register', auth.register);
router.post('/authenticate', auth.authenticate);
router.get('/logout', auth.logout);
router.get('/users', auth.getUsers);

module.exports = router;
