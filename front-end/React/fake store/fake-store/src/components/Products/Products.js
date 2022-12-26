import SingleProduct from "./SingleProduct";
import { useEffect, useState, useContext } from "react";
import Grid from "@mui/material/Grid";
import Rating from "@mui/material/Rating";
import { useNavigate } from "react-router-dom";
import { AlertContex } from "../../context/AlertContex";

const Products = ({ categoryId, style, categories }) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const { toggleOn } = useContext(AlertContex);

  const getProducts = async (id) => {
    setProducts([]);
    const productCategory =
      process.env.React_APP_API + `/products/category/${id}`;
    const allProduct = process.env.React_APP_API + `/products`;
    const res = await fetch(id ? productCategory : allProduct);
    const json = await res.json();
    setProducts(json.data);
    toggleOn(json.messages, json.success);
  };

  useEffect(() => {
    getProducts(categoryId);
  }, [categoryId]);

  return (
    <div
      style={{
        ...style
      }}
    >
      <h1
        style={{
          width: "98%",
          textAlign: "center",
          borderBottom: "1px solid #000",
          lineHeight: "0.1em",
          margin: "100px 0 100px"
        }}
      >
        <span
          style={{
            background: "#fff",
            padding: "0 20px",
            textTransform: "capitalize"
          }}
        >
          {categories.find(category => category.id == categoryId)?.name || "all"}
        </span>
      </h1>
      <Grid sx={{ m: 0, p: 0 }} container gap={5}>
        {products?.length > 0 &&
          products.map((product) => (
            <Grid
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
                width: 200,
                height: 400,
                cursor: "pointer"
              }}
              onClick={() => navigate(`/${product.id}`)}
              key={product.id}
              item
            >
              <img
                style={{ width: "100%", height: "50%" }}
                src={product?.img}
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%"
                }}
              >
                <label>{product?.title}</label>
                <label style={{ marginTop: 5 }}>price: {product?.price}$</label>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%"
                }}
              >
                <Rating
                  name="half-rating-read"
                  value={product.rate}
                  precision={0.5}
                  readOnly
                />
                <label>count: {product?.count}</label>
              </div>
            </Grid>
          ))}
      </Grid>
    </div>
  );
};

export default Products;
