const User = require("../models/user");

const ErrorHandler = require("../utils/errorHandler");
// const ErrorHandler = require("../utils/errorHandler");
const sendToken = require("../utils/jwtToken");

exports.registerUser = async (req, res, next) => {
  const { name, email, password,role } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    role,
    avatar: {
      public_id: "avatars/sxamgzs1aj91rqahehqe",
      url: "https://res.cloudinary.com/dgneiaky7/image/upload/v1649818466/avatars/sxamgzs1aj91rqahehqe.png",
    },
  });

  //test token
  //   const token = user.getJwtToken();

  //   res.status(201).json({
  //     success: true,
  //     user,
  //     token,
  //   });
  sendToken(user, 200, res);
};

exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  // Checks if email and password is entered by user
  if (!email || !password) {
    return next(new ErrorHandler("Please enter email & password", 400));
  }

  // Finding user in database
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid Email or Password", 401));
  }

  // Checks if password is correct or not
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Email or Password", 401));
  }

  //   const token = user.getJwtToken();
  //   res.status(201).json({
  //     success: true,
  //     token,
  //   });

  sendToken(user, 200, res);
};

exports.logout = async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),

    httpOnly: true,
  });

  res.status(200).json({
    success: true,

    message: "Logged out",
  });
};
