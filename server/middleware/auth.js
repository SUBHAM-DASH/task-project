const jwt = require("jsonwebtoken");
exports.auth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (authorization && authorization.startsWith("Bearer")) {
      const token = authorization.split(" ")[1];

      if (!token) {
        res
          .status(403)
          .json({ status: "Failed", message: "Authorization Denied." });
      }
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } else {
      return res
        .status(403)
        .json({ status: "Failed", message: "Authorization Denied." });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ status: "failed", message: "Internal server Error" });
  }
};
