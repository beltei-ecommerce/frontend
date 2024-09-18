import { fetchCartsAPI } from "../api/cart.js";
import { getImageByNameAPI } from "../api/file.js";

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
  },
};

export default Cart;
