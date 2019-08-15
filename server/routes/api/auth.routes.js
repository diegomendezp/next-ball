const express = require("express");

const router = express.Router();
const auth = require("../../controllers/auth.controller");

router.post("/register", auth.register);
router.post("/authenticate", auth.authenticate);
router.get("/logout", auth.logout);

module.exports = router;
