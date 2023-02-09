const User = require("../models/user");

const jwt = require("jsonwebtoken");

const ErrorHandler = require("../utils/errorHandler");

// Checks if user is authenticated or not

exports.isAuthenticatedUser = async (req, res, next) => {
  const { token } = req.cookies;

  console.log(token);

  if (!token) {
    return next(new ErrorHandler("Login first to access this resource.", 401));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decoded.id);

  next();
};

exports.authorizeRoles = (...roles) => {
  console.log(roles);

  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role (${req.user.role}) is not allowed to acccess this resource`,
          403
        )
      );
    }

    next();
  };
};
