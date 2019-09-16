const express = require('express');

const router = express.Router();
const auth = require('../../controllers/auth.controller');
const secure = require('../../middlewares/secure.mid');
const uploader = require('../../configs/cloudinary.config');

router.post('/register', auth.register);
router.post('/authenticate', auth.authenticate);
router.put('/edit-profile', secure.isAuthenticated, uploader.single('image'), auth.editProfile);
router.post('/valorate/:id', secure.isAuthenticated, auth.valorate);
router.get('/logout', auth.logout);
router.get('/users', secure.isAuthenticated, auth.getUsers);
router.get('/profile', secure.isAuthenticated, auth.getProfile);

module.exports = router;
