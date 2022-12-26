let products = [];

const cardList = document.querySelector(".cards");

const getProducts = async () => {
  const res = await fetch("https://fakestoreapi.com/products");
  const data = await res.json();
  products = [];
  products.push(...data);
};

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

const showCards = (data) => {
  cardList.innerHTML = "";
  data.map((item) => {
    cardList.innerHTML += `
        <li id="${item.id}"class="card">
        <img
            src="${item.image}"
            alt=""
          /> 
          <div class="card-info">
            <p>
              ${item.title}
              Bracelet
            </p>
            <p>price: ${item.price}</p>
            ${rate(item.rating.rate)}
          </div>
        </li>
        `;
  });
};

await getProducts();
showCards(products);

cardList.addEventListener("click", (e) => {
  e.path.map((el) => {
    if (el.tagName == "LI") {
      window.location.href = `https://zaabta.github.io/thinkSyria/e%20commerce/single_product.html?productId=${el.id}`;
    }
  });
});
