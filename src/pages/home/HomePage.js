import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

export default function HomePage() {
  const dispatch = useDispatch();
  const ProductStore = useSelector((store) => store.Product);
  const { products } = ProductStore;
  const navigate = useNavigate();

  useEffect(() => {
    loadProducts(); // eslint-disable-next-line
  }, []);

  async function loadProducts() {
    try {
      await dispatch.Product.getProducts();
    } catch (error) {
      console.log(error);
    }
  }

  function goToLogin() {
    return navigate("/login");
  }

  return (
    <div>
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
