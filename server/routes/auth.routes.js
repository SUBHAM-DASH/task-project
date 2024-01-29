const express = require("express");
const router = express.Router();
const {signupuser,loginuser} = require("../controllers/auth.controllers");

//Signup user
router.post("/signupuser",signupuser);

// Login user
router.post("/loginuser",loginuser);


module.exports = router;