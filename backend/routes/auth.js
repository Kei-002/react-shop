const express = require("express");

const router = express.Router();

const { registerUser } = require("../controllers/authController");

// router.route("/register").post(registerUser);
router.post("/register",registerUser)

// router.route('/login').post(loginUser);

// router.route('/password/forgot').post(forgotPassword);

// router.route('/password/reset/:token').put(resetPassword);

// router.route('/logout').get(logout);

module.exports = router;
