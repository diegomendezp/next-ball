const express = require("express");

const router = express.Router();
const auth = require("../../controllers/auth.controller");
const secure = require("../../middlewares/secure.mid");

router.post("/register", auth.register);
router.post("/authenticate", auth.authenticate);
router.post("/valorate/:id", secure.isAuthenticated, auth.authenticate);
router.get("/logout", auth.logout);
router.get("/users", secure.isAuthenticated, auth.getUsers);

module.exports = router;
