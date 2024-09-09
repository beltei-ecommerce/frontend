import {
  fetchProductsAPI,
  getProductByIdAPI,
  createProductAPI,
  updateProductByIdAPI,
  deleteProductByIdAPI,
} from "../api/product.js";

const Product = {
  state: {
    product: {},
    products: [],
  },

  reducers: {
    setProducts(state, data) {
      state.products = data;
      return { ...state };
    },
    setProduct(state, data) {
      state.product = data;
      return { ...state };
    },
  },

  effects: {
    async getProducts(params) {
      const data = await fetchProductsAPI(params);
      this.setProducts(data.data.rows);
      return data;
    },
    async getProductById(id) {
      const data = await getProductByIdAPI(id);
      this.setProduct(data.data);
      return data;
    },
    async createProduct(payload) {
      return createProductAPI(payload);
    },
    async updateProduct(id, payload) {
      return updateProductByIdAPI(id, payload);
    },
    async deleteProduct(id) {
      return deleteProductByIdAPI(id);
    },
  },
};

export default Product;
