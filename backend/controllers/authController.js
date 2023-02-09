const User = require("../models/user");

const ErrorHandler = require("../utils/errorHandler");

exports.registerUser = async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    // role,
    avatar: {
      public_id: "avatars/sxamgzs1aj91rqahehqe",
      url: "https://res.cloudinary.com/dgneiaky7/image/upload/v1649818466/avatars/sxamgzs1aj91rqahehqe.png",
    },
  });

  //test token
  // const token = user.getJwtToken();

  res.status(201).json({
    success: true,
    user,
    // 	token
  });
  //  sendToken(user, 200, res)
};
