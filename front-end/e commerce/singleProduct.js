let queryString = new URLSearchParams(window.location.href.split("?")[1]);
let singleProduct = {};
const productId = queryString.get("productId");
const selectedProduct = document.querySelector(".single-product");

console.log("productId: ", queryString.get("productId"));

const getSingleProducts = async (id) => {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  const data = await res.json();
  singleProduct = {};
  singleProduct = { ...data };
};

await getSingleProducts(productId);
console.log(singleProduct);

const rate = (num) => {
    let rating = '<div class="rating">';
    const checkedStars = Math.round(num)
    for (var i = 0; i < 5; i++) {
      if(i < checkedStars)
      rating += '<span class="fa fa-star checked"></span>'
      else
      rating += '<span class="fa fa-star"></span>'
    }
    rating += "</div>"
    return rating
  };

selectedProduct.innerHTML = `
<div>
        <img
          src="${singleProduct.image}"
          alt=""
        />
        <div class="product-info">
          <h2>${singleProduct.title}</h2>
          <p><strong>Category:</strong> ${singleProduct.category}</p>
          <p>
            <strong>description:</strong>
            ${singleProduct.description}
          </p>
          <strong><p>price: ${singleProduct.price}</p></strong>
          ${rate(singleProduct.rating.rate)}
        </div>
      </div>
`;


