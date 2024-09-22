import { getImageByNameAPI } from "../api/file.js";
import { fetchCartsAPI, updateCartByIdAPI, deleteCartByIdAPI } from "../api/cart.js";

const Cart = {
  state: {
    carts: [],
  },

  reducers: {
    setCarts(state, data) {
      state.carts = data;
      return { ...state };
    },
  },

  effects: {
    async getCarts(params) {
      const data = await fetchCartsAPI(params);
      this.setCarts(data.data);

      await Promise.all(
        data.data.map(async (item) => {
          if (item.product.productImages?.length) {
            item.product.image = await getImageByNameAPI(
              item.product.productImages[0].name
            );
          }
        })
      );

      this.setCarts(data.data);

      return data;
    },
    async updateCartById({ id, payload }) {
      return updateCartByIdAPI(id, payload);
    },
    async deleteCartById(id) {
      return deleteCartByIdAPI(id);
    },
  },
};

export default Cart;
