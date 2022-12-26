const models = require("../../../models");
const responses = require("../../helper/responses");
const services = require("../services");
const transformers = require("../../transformers");

const getProducts = async (req, res, next) => {
  try {
    const products = await services.getProducts();
    if (products)
      return responses.successWithMessage(
        "Products have gotten sucessfully",
        res,
        transformers.productsTransformer(products)
      );
    return responses.failedWithMessage("failed to get the products !", res);
  } catch (err) {
    console.log("Error -->", err);
    return responses.serverError(res);
  }
};

const getProduct = async (req, res, nex) => {
  try {
    const productId = req?.params?.id;
    if (!productId)
      return responses.failedWithMessage("Define the product please !", res);
    const product = await services.getProduct(productId);
    return product
      ? responses.successWithMessage(
          "Single products got successfully!",
          res,
          transformers.productTransformer(product)
        )
      : responses.failedWithMessage("Failed to get the single products !", res);
  } catch (err) {
    console.log("Error -->", err);
    return responses.serverError(res);
  }
};

const getProductByCategory = async (req, res, next) => {
  try {
    const categoryId = req?.params?.id;
    if (!categoryId)
      return responses.failedWithMessage("Please define the category", res);
    const products = await services.getProductsByCategory(categoryId)
    return products?.length > 0 ? responses.successWithMessage("Products have gotten sucessfully", res, transformers.productsTransformer(products))
    : responses.failedWithMessage("Failed to get products", res)
  } catch (err) {
    console.log("Error -->", err);
    return responses.serverError(res);
  }
};

module.exports = {
  getProducts,
  getProductByCategory,
  getProduct
};
