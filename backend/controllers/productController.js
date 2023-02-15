const Product = require("../models/product");
const APIFeatures = require("../utils/apiFeatures");
const ErrorHandler = require("../utils/errorHandler");
//create new product

exports.newProduct = async (req, res, next) => {
  console.log(req.body);

  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,

    product,
  });
};

exports.getProducts = async (req, res, next) => {
  //   const products = await Product.find();
  const resPerPage = 10;
  const productsCount = await Product.countDocuments();

  const apiFeatures = new APIFeatures(Product.find(), req.query)
    .search()
    .filter();

  apiFeatures.pagination(resPerPage);
  const products = await apiFeatures.query;

  res.status(200).json({
    success: true,
    count: products.length,
    productsCount,
    products,
  });
};
exports.getSingleProduct = async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  //   if (!product) {
  //     return res.status(404).json({
  //       success: false,

  //       message: "Product not found",
  //     });
  //   }

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,

    product,
  });

};
exports.updateProduct = async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  //   if (!product) {
  //     return res.status(404).json({
  //       success: false,

  //       message: "Product not found",
  //     });
  //   }

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  product = await Product.findByIdAndUpdate(req.param.id, req.body, {
    new: true,

    runValidators: true,

    useFindandModify: false,
  });

  res.sendStatus(200).json({
    success: true,

    product,
  });
};

exports.deleteProduct = async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({
      success: false,

      message: "Product not found",
    });
  }

  await product.remove();

  res.status(200).json({
    success: true,

    message: "Product deleted",
  });
};
