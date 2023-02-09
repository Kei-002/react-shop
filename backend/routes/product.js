const express = require("express");

const router = express.Router();

const {
  getProducts,
  newProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

router.route("/products").get(getProducts);

router.route("/product/new").post(newProduct);
router.route("/product/:id").get(getSingleProduct);
router.route("/admin/product/:id").put(updateProduct).delete(deleteProduct);

// router.get("/products", getProducts)


module.exports = router;
