const express = require("express");

const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth')

const {
  getProducts,
  newProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

// router.route("/products").get(getProducts);
// router.get("/products", getProducts)
// router.get('/products', isAuthenticatedUser,  getProducts)
router.get('/products', isAuthenticatedUser,authorizeRoles("admin","encoder"),  getProducts)
router.route("/product/new").post(newProduct);
router.route("/product/:id").get(getSingleProduct);
router.route("/admin/product/:id").put(updateProduct).delete(deleteProduct);




module.exports = router;
