import { createAddressAPI, fetchAddressesAPI } from "../api/address.js";

const Address = {
  state: {
    addresses: [],
  },

  reducers: {
    setAddresses(state, data) {
      state.addresses = data;
      return { ...state };
    },
  },

  effects: {
    async fetchAddresses() {
      const data = await fetchAddressesAPI();
      this.setAddresses(data.data);
      return data;
    },
    async createAddress(payload) {
      return createAddressAPI(payload);
    },
  },
};

export default Address;
