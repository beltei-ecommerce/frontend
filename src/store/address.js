import {
  createAddressAPI,
  fetchAddressesAPI,
  updateAddressByIdAPI,
  deleteAddressByIdAPI,
} from "../api/address.js";

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
    async updateAddressById({ id, payload }) {
      return updateAddressByIdAPI(id, payload);
    },
    async deleteAddressById(id) {
      return deleteAddressByIdAPI(id);
    },
  },
};

export default Address;
