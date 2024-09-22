import { fetchUserAPI, loginAPI } from "../api/auth.js";

const User = {
  state: {
    user: {},
    token: null,
    canSeeMenu: false,
    items_in_cart: 0
  },

  reducers: {
    setUser(state, data) {
      state.user = data;
      return { ...state };
    },
    setToken(state, data) {
      state.token = data;
      return { ...state };
    },
    setCanSeeMenu(state, data) {
      state.canSeeMenu = data;
      return { ...state };
    },
    setItemsInCart(state, data) {
      state.items_in_cart = data;
      return { ...state };
    },
  },

  effects: {
    async fetchUser() {
      const { user, can_see_menus, items_in_cart } = await fetchUserAPI();
      this.setUser(user);
      this.setCanSeeMenu(can_see_menus);
      this.setItemsInCart(items_in_cart);
    },
    async login(payload) {
      const data = await loginAPI(payload);
      const { user, token, can_see_menus } = data;
      this.setUser(user);
      this.setToken(token);
      this.setCanSeeMenu(can_see_menus);
      localStorage.setItem("token", token);

      return data;
    },
    logout() {
      localStorage.removeItem("token");
      this.setUser({});
      this.setToken(null);
      this.setCanSeeMenu(false);
    },
  },
};

export default User;
