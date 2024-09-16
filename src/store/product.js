import {
  fetchProductsAPI,
  getProductByIdAPI,
  createProductAPI,
  updateProductByIdAPI,
  deleteProductByIdAPI,
} from "../api/product.js";
import { getImageByNameAPI } from "../api/file.js";

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
      // set products to show text content first, because images will take time to load
      this.setProducts(data.data.rows);

      await Promise.all(
        data.data.rows.map(async (item) => {
          if (item.productImages?.length) {
            item.image = await getImageByNameAPI(item.productImages[0].name);
          }
        })
      );

      // re set products again to show with their image
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
    async updateProductById({ id, payload }) {
      return updateProductByIdAPI(id, payload);
    },
    async deleteProductById(id) {
      return deleteProductByIdAPI(id);
    },
  },
};

export default Product;
