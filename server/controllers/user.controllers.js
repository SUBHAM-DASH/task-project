// User Info
const { executeQueryWithParams } = require("../db");
exports.userinformation = async (req, res) => {
  try {
    const { userId } = req.user;
    const [result] = await executeQueryWithParams(
      `SELECT * FROM "user" WHERE id = $1`,
      [userId]
    );
    res.status(200).json({ status: "success", result });
  } catch (error) {
    return res
      .status(500)
      .json({ status: "failed", message: "Internal server error" });
  }
};
