import {
  fetchCategoriesAPI,
  getCategoryByIdAPI,
  createCategorytAPI,
  updateCategorytByIdAPI,
  deleteCategorytByIdAPI,
} from "../api/category.js";

const Category = {
  state: {
    category: {},
    categories: [],
  },

  reducers: {
    setCategories(state, data) {
      state.categories = data;
      return { ...state };
    },
    setCategory(state, data) {
      state.category = data;
      return { ...state };
    },
  },

  effects: {
    async getCategories(params) {
      const data = await fetchCategoriesAPI(params);
      this.setCategories(data.data.rows);
      return data;
    },
    async getCategoryById(id) {
      const data = await getCategoryByIdAPI(id);
      this.setCategory(data.data);
      return data;
    },
    async createCategory(payload) {
      return createCategorytAPI(payload);
    },
    async updateCategoryById({ id, payload }) {
      return updateCategorytByIdAPI(id, payload);
    },
    async deleteCategoryById(id) {
      return deleteCategorytByIdAPI(id);
    },
  },
};

export default Category;
