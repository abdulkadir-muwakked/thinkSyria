const models = require("../../models");

const userTransformer = (user) => {
  const transformeredUser = {};
  if (user) {
    transformeredUser.username = user?.username;
    transformeredUser.email = user?.email;
    transformeredUser.type = user?.Type?.type;
    transformeredUser.avatar = user?.avatar;
    return transformeredUser;
  }
  return user;
};

const productTransformer = (product) => {
  const transformeredProduct = {};
  if (transformeredProduct) {
    transformeredProduct.id = product?.id;
    transformeredProduct.title = product?.title;
    transformeredProduct.price = product?.price;
    transformeredProduct.description = product?.description;
    transformeredProduct.img = product?.image;
    transformeredProduct.rate = product?.rate;
    transformeredProduct.count = product?.count;
    transformeredProduct.category = product?.Category?.name;
    return transformeredProduct;
  }
  return product;
};

const productsTransformer = (products) => {
  if (products?.length > 0)
    return products.map((product) => productTransformer(product));
  return products;
};

const cartTransformer = async (cart) => {
  if (cart) {
    const product = await models.Product.findOne({
      where: {
        id: cart?.productId
      },
      include: [
        {
          model: models.Category,
          as: "Category"
        }
      ]
    });
    return {
      ...productTransformer(product),
      id: cart.id,
      count: cart.count,
      productId: cart?.productId
    };
  }
  return cart;
};

const cartsTransformer = async (carts) => {
  if (carts?.length > 0) {
    const transformeredCarts = [];
    for(var i = 0; i < carts.length ; i++){
      const transformeredCart = await cartTransformer(carts[i]) 
      transformeredCarts.push(transformeredCart)
    }
    return transformeredCarts
  }
  return carts;
};

const categoryTeransfromer = (category) => {
  const teransfromeredCategory = {}
  if(category) {
    teransfromeredCategory.id = category?.id
    teransfromeredCategory.name = category?.name
    return teransfromeredCategory
  }
  return category
}

const categoryTeransfromers = (categories) => {
  const teransfromeredcategories = []
  if(categories) {
    return categories.map(category => categoryTeransfromer(category))
  } 
  return categories
}

module.exports = {
  userTransformer,
  productTransformer,
  productsTransformer,
  cartTransformer,
  cartsTransformer,
  categoryTeransfromers
};
