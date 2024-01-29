const express = require("express");
const router = express.Router();
const { userinformation } = require("../controllers/user.controllers");
const { auth } = require("../middleware/auth");

//User information
router.get("/userinformation", auth, userinformation);

module.exports = router;
