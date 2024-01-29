const { executeQuery, executeQueryWithParams } = require("../db");
const { v4: uuidv4, v5: uuidv5, validate: uuidValidate } = require("uuid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { insertUserQuery } = require("../sql/user.sql");

//Signup user
exports.signupuser = async (req, res) => {
  try {
    const { name, email, password, mobileNumber } = req.body;    
    if (email && password) {
      const [user] = await executeQueryWithParams(
        `SELECT * FROM "user" WHERE email = $1`,
        [email]
      );
      if (user) {
        return res.status(403).json({
          status: "failed",
          message: "Email exists. signup with new email.",
        });
      }
    }
    const id = uuidv4().toString();
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    await executeQueryWithParams(insertUserQuery, [
      id,
      name,
      email,
      hashPassword,
      mobileNumber,
    ]);
    const token = jwt.sign({ userId: id }, process.env.JWT_SECRET);
    res.status(200).json({
      status: "success",
      message: "Account Created Successfully! Login Now.",
      token,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ status: "failed", message: "Internal server error." });
  }
};

// Login user
exports.loginuser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        status: "failed",
        message: "Kindly provide email and password",
      });
    }
    const [existUser] = await executeQueryWithParams(
      `SELECT * FROM "user" WHERE email = $1`,
      [email]
    );
    if (!existUser) {
      return res.status(404).json({
        status: "failed",
        message: "Email doesn't exist.please login with valid email.",
      });
    }
    const isPasswordMatch = await bcrypt.compare(password, existUser.password);
    if (!isPasswordMatch) {
      return res
        .status(401)
        .json({ status: "failed", message: "password doesn't match" });
    }

    //Generate Token
    const token = jwt.sign({ userId: existUser.id }, process.env.JWT_SECRET, {
      expiresIn: "4d",
    });
    res
      .status(200)
      .json({
        status: "success",
        message: "Login Successfully!",
        token: token,
      });
  } catch (error) {
    return res
      .status(500)
      .json({ status: "failed", message: "Internal server error." });
  }
};
