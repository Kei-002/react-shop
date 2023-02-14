const express = require("express");

const router = express.Router();

const {
  registerUser,
  loginUser,
  logout,
  forgotPassword,
  resetPassword,
  getUserProfile,
  updatePassword,
  updateProfile,
  allUsers,
  getUserDetails,
  updateUser,
  deleteUser

} = require("../controllers/authController");

const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

// router.route("/register").post(registerUser);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logout);

// router.route('/login').post(loginUser);

router.route("/password/forgot").post(forgotPassword);

router.route("/password/reset/:token").put(resetPassword);
router.put('/password/update', isAuthenticatedUser, updatePassword)
router.get("/me", isAuthenticatedUser, getUserProfile);
router.put('/me/update', isAuthenticatedUser, updateProfile)
// router.route('/logout').get(logout);

router.route('/admin/users').get(isAuthenticatedUser, authorizeRoles('admin'), allUsers)
router.route('/admin/user/:id')
    .get(isAuthenticatedUser, authorizeRoles('admin'), getUserDetails)
    .put(isAuthenticatedUser, authorizeRoles('admin'), updateUser)
    .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteUser)


// router.route('/admin/users').get(isAuthenticatedUser, authorizeRoles('admin'), allUsers)
module.exports = router;
