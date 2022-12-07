import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {Avatar, Box} from "@mui/material";

import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AtuthContext";
import { AlertContex } from "../../context/AlertContex";

const Carts = () => {
  const { token } = useContext(AuthContext);
  const { toggleOn } = useContext(AlertContex);
  const [myCarts, setMyCarts] = useState([]);

  const filterCarts = (carts) => {
    const filteredCarts = [];
    carts.map((cart) => {
      const index = filteredCarts.findIndex((filteredCart) => cart?.productId == filteredCart?.productId && cart.id != filteredCart?.id);
      if (index == -1 ) {
        filteredCarts.push(cart);
      } else {
        filteredCarts[index].count =  filteredCarts[index].count + cart.count;
      }
    });
    return filteredCarts;
  };

  const getTotal = (carts) => {
    
    let total = 0   
    carts.map(cart => {
        total +=  cart.price * cart.count
    })
    return total
  }

  const getCarts = () => {
    axios
      .get(process.env.React_APP_API + "/carts", {
        headers: {
          "Content-Type": "application/JSON",
          Authorization: `Bearer ${token}`
        }
      })
      .then((res) => {
        toggleOn(res.data.messages, res.data.success);
        setMyCarts(filterCarts(res.data.data));
      })
      .catch((err) =>
        toggleOn(err.response.data.messages, err.response.data.success)
      );
  };
  useEffect(() => {
    getCarts();
  }, []);

  return (
    <Box sx={{
        display: "flex",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center"
    }}>
      <TableContainer sx={{
        width: "60%"
      }}component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>product</TableCell>
              <TableCell align="left">name</TableCell>
              <TableCell align="left">Qty</TableCell>
              <TableCell align="left">price</TableCell>
              <TableCell align="left">Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {myCarts?.length > 0 && myCarts.map((cart) => (
                <TableRow
                  key={cart.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <Avatar
                      alt="Remy Sharp"
                      src={cart.img}
                      sx={{ width: 106, height: 106 }}
                      onClick={(e)=> console.log(e.target)}
                    />
                  </TableCell>
                  <TableCell align="left">{cart.title}</TableCell>
                  <TableCell align="left">{cart.count}</TableCell>
                  <TableCell align="left">{cart.price}$</TableCell>
                  <TableCell align="left">
                    {cart.price * cart.count}$
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
              <TableCell align="left">GREAT TOTAL</TableCell>
              <TableCell align="right">{getTotal(myCarts)}$</TableCell>
              </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Carts;
