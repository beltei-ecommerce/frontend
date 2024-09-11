import { fetchUserAPI, loginAPI } from "../api/auth.js";

const User = {
  state: {
    user: {},
    token: null,
    canSeeMenu: false,
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
  },

  effects: {
    async fetchUser() {
      const { user, can_see_menus } = await fetchUserAPI();
      this.setUser(user);
      this.setCanSeeMenu(can_see_menus);
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
