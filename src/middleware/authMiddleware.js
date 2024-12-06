const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/user");

const auth = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id).select("-password");

      if (!user) {
        res.statusCode(500).json({
          state: false,
          message: "Vous n'êtes pas autorisé",
        });
      }
      req.user = user;

      next();
    } catch (e) {
      res.status(401).json({
        error: true,
        message: "Veuillez vous connecter",
      });
    }
  }
});

const isAdmin = asyncHandler(async (req, res, next) => {
  try {
    const { username } = req.user;
    const user = await User.findOne({ username });
    if (!user.isAdmin) {
      res.status(500).json({
        state: false,
        message: "Vous n'avez pas le droit Administrateur",
      });
    } else {
      next();
    }
  } catch (e) {
    res.status(500).json({
      state: false,
      message: e.message,
    });
  }
});

module.exports = { auth, isAdmin };
