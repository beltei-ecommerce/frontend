import { fetchUserAPI, loginAPI } from "../api/auth.js";

const User = {
  state: {
    user: {},
    token: null,
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
  },

  effects: {
    async fetchUser() {
      const data = await fetchUserAPI();
      this.setUser(data.user);
    },
    async login(payload) {
      const data = await loginAPI(payload);
      this.setUser(data.user);
      this.setToken(data.token);
      localStorage.setItem("token", data.token);
    },
  },
};

export default User;
