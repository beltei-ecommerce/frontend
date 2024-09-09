import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

export default function HomePage() {
  const dispatch = useDispatch();
  const ProductStore = useSelector((store) => store.Product);
  const CategoryStore = useSelector((store) => store.Category);
  const { products } = ProductStore;
  const { categories } = CategoryStore;
  const navigate = useNavigate();

  useEffect(() => {
    loadData(); // eslint-disable-next-line
  }, []);

  useEffect(() => {
    console.log(categories);
  }, [categories]);

  async function loadData() {
    try {
      await dispatch.Product.getProducts({ page: 1, limit: 10 });
      await dispatch.Category.getCategories();
    } catch (error) {
      console.log(error);
    }
  }

  function goToLogin() {
    return navigate("/login");
  }

  return (
    <div>
      {/* TODO */}
      <h1 style={{ textAlign: "center" }}>Welcome to CC COMPUTER</h1>
      <Box sx={{ textAlign: "center" }}>
        <Button variant="outlined" className="Button" onClick={goToLogin}>
          Go to login
        </Button>
      </Box>
      <div>
        {products.map(({ name }, index) => (
          <div key={index}>{name}</div>
        ))}
      </div>
    </div>
  );
}
