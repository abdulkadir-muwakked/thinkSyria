import { useState, useEffect, useContext } from "react";
import Categories from "../../components/Categories/Categories";
import Box from "@mui/material/Box";
import Products from "../../components/Products/Products";
import { AlertContex } from "../../context/AlertContex";


const Home = () => {
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState(0);
  const { toggleOn } = useContext(AlertContex)

  const getCategories = () => {
    fetch(process.env.React_APP_API + "/categories")
      .then((res) => res.json())
      .then((json) =>{
        setCategories([{ id: json.data.length + 1, name: "all" }, ...json.data])
        toggleOn(json.messages, json.success)
      }
        
      );
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%"
      }}
    >
      {categories?.length > 0 && (
        <Categories
          style={{
            width: "20%",
            height: 300,
            alignSelf: "flex-start"
          }}
          handelOnChangeCategoryId={setCategoryId}
          items={categories}
        />
      )}
      <Products
        style={{
          width: "70%",
          height: "100%",
        }}
        categories={categories}
        categoryId={categoryId == categories.length ? 0 : categoryId}
      />
    </Box>
  );
};

export default Home;
