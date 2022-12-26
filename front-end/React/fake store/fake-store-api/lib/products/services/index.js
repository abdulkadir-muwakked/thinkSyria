const models = require("../../../models");

const getProducts = async () => {
  try {
    const products = await models.Product.findAll({
      where: {
        deletedAt: null
      },
      include: [
        {
            model: models.Category,
            as: "Category"
        }
    ]
    });
    return products;
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
};

const getProduct = async (id) => {
  try {
    const product = await models.Product.findOne({
      where: {
        id, 
        deletedAt: null
      },
      include: [
        {
          model: models.Category,
          as: "Category"
        }
      ]
    })
    return product
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
} 

const getProductsByCategory = async (categoryId) => {
  try {
    const products = await models.Product.findAll({
      where: {
        deletedAt: null,
        categoryId
      },
      include: [
        {
            model: models.Category,
            as: "Category"
        }
    ]
    });
    return products;
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
}

module.exports = {
  getProducts,
  getProduct,
  getProductsByCategory
};
