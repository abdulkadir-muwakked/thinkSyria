const responses = require("../../helper/responses");
const services = require("../services");
const transformers = require("../../transformers");

const addCart = async (req, res, next) => {
  try {
    const userId = req?.user?.id;
    if (!userId) return responses.unauthorized(res);
    const { productId, count } = req?.body;
    if (!(productId && count))
      return responses.failedWithMessage(
        "please Enter the product and quantity",
        res
      );
    const cart = await services.addCart({ userId, productId, count });
    return cart
      ? responses.successWithMessage(
          "Added it successfully",
          res,
          await transformers.cartTransformer(cart)
        )
      : responses.failedWithMessage("Failed to add it", res);
  } catch (err) {
    console.log("ERROR--> ", err);
    return responses.serverError(res);
  }
};

const getCarts = async (req, res, next) => {
  try {
    const userId = req?.user?.id;
    if (!userId) return responses.unauthorized(res);
    const carts = await services.getCarts(userId);
    return carts?.length > 0
      ? responses.successWithMessage(
          "",
          res,
          await transformers.cartsTransformer(carts)
        )
      : responses.failedWithMessage("", res);
  } catch (err) {
    console.log("ERROR--> ", err);
    return responses.serverError(res);
  }
};

const deletedCart = async (req, res, next) => {
  try {
    const userId = req?.user?.id;
    if (!userId) return responses.unauthorized(res);
    const productId = req?.params?.id;
    if (!productId)
      return responses.failedWithMessage(
        "Select the cart you want to be deleted",
        res
      );
    const isFound = await services.getCart({productId, userId});
    if (!isFound)
      return responses.failedWithMessage(
        "Failed to delete the cart !",
        res
      );
    const cart = await services.deleteCart({productId, userId});
    return cart
      ? responses.successWithMessage(
          "The cart has been removed successfully",
          res,
          {cartId: cart}
        )
      : responses.failedWithMessage("Failed to remove it", res);
  } catch (err) {
    console.log("ERROR--> ", err);
    return responses.serverError(res);
  }
};


module.exports = {
  addCart,
  getCarts,
  deletedCart,
};
