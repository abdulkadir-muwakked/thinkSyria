const models = require("../../../models");
const { fn } = require("sequelize");

const addCart = async ({ userId, productId, count }) => {
  try {
    const product = await models.Product.findOne({
      where: {
        id: productId
      }
    });
    if (!product) return null; // if the product is not found
    if (product?.count < count) return null;
    const updatedProduct = await models.Product.update(
      {
        count: product?.count - count
      },
      {
        where: {
          id: productId
        }
      }
    );
    if (!updatedProduct[0]) return null;
    const cart = models.Cart.create({
      userId,
      productId,
      count
    });
    if (!cart) return null;
    return cart;
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
};

const getCarts = async (userId) => {
  try {
    const carts = await models.Cart.findAll({
      where: {
        deletedAt: null,
        userId
      }
    });
    if (carts?.length > 0) return carts;
    return null;
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
};

const deleteCart = async ({productId, userId}) => {
  try {
    const deletedCart = await models.Cart.update(
      { deletedAt: fn("now") },
      { where: { id:productId, userId } }
    );
    return deletedCart[0] ? productId : null;
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
};

const getCart = async ({productId, userId}) => {
  try {
    const cart = await models.Cart.findOne({
      where: {
        id: productId,
        userId,
        deletedAt: null
      }
    });
    return cart
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
};

module.exports = {
  addCart,
  getCarts,
  getCart,
  deleteCart
};
