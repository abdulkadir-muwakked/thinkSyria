import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Paper, Box } from "@mui/material";
import Rating from "@mui/material/Rating";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { grey, red } from "@mui/material/colors";
import { AuthContext } from "../../context/AtuthContext";
import { AlertContex } from "../../context/AlertContex";

const SingleProduct = () => {
  const { id } = useParams();
  const [singleProduct, setSingleProduct] = useState([]);
  const [counter, setConuter] = useState(0);
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  console.log(token);
  const { toggleOn } = useContext(AlertContex);

  const getSingleProduct = async (id) => {
    setSingleProduct([]);
    !isNaN(id)
      ? axios
          .get(process.env.React_APP_API + `/products/` + id)
          .then((res) => setSingleProduct(res.data.data))
          .catch((err) => navigate("/noutfound"))
      : navigate("/noutfound");
  };

  useEffect(() => {
    getSingleProduct(id);
  }, []);
  const addCart = async (productId, count) => {
    axios
      .post(
        process.env.React_APP_API + "/carts",
        {
          productId,
          count
        },
        {
          headers: {
            "Content-Type": "application/JSON",
            "Authorization": `Bearer ${token}`
          }
        }
      )
      .then((res) => toggleOn(res.data.messages, res.data.success))
      .catch((err) =>
        toggleOn(err.response.data.messages, err.response.data.success)
      );
  };

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center"
      }}
      component="div"
    >
      <Paper
        sx={{
          width: "75%",
          height: "70%",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-around"
        }}
        elevation={13}
      >
        <div
          className="left-side"
          style={{
            height: "70%",
            width: "30%",
            alignSelf: "center"
          }}
        >
          <img
            src={singleProduct.img}
            style={{
              height: "100%",
              width: "100%"
            }}
          />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            height: "100%",
            alignItems: "center"
          }}
          className="rigth-side"
        >
          <h3>{singleProduct.title}</h3>
          <h4>price: {singleProduct.price}$</h4>
          <p
            style={{
              width: 300,
              margin: 0
            }}
          >
            {singleProduct.description}
          </p>
          <Rating
            name="half-rating-read"
            value={parseFloat(singleProduct.rate)}
            precision={0.5}
            readOnly
          />
          <div
            style={{
              width: 300,
              display: "flex",
              justifyContent: "space-between"
            }}
          >
            <div
              style={{
                display: "flex",
                width: 100,
                height: 30,
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 10
              }}
              className="counter"
            >
              <input
                style={{
                  width: "100%",
                  height: "100%",
                  margin: "0 4px"
                }}
                value={"+"}
                type={"button"}
                onClick={() =>
                  counter + 1 <= singleProduct.count && setConuter(counter + 1)
                }
              />
              {counter}
              <input
                style={{
                  width: "100%",
                  height: "100%",
                  margin: "0 4px"
                }}
                value={"-"}
                type={"button"}
                onClick={() => counter > 0 && setConuter(counter - 1)}
              />
            </div>
            <div
              style={{
                alignSelf: "center"
              }}
            >
              Total price : {singleProduct.price * counter}${" "}
            </div>
            <IconButton
              sx={{
                color: grey[800]
              }}
              aria-label="add to shopping cart"
              onClick={() => addCart(singleProduct.id, counter)}
            >
              <AddShoppingCartIcon />
            </IconButton>
          </div>
        </div>
      </Paper>
    </Box>
  );
};

export default SingleProduct;
