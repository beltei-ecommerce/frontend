import http from ".";

export async function fetchCategoriesAPI(params) {
  return http.get("/categories", { params });
}

export async function getCategoryByIdAPI(id) {
  return http.get(`/categories/${id}`);
}

export async function createCategorytAPI(payload) {
  return http.post("/categories", payload);
}

export async function updateCategorytByIdAPI(id, payload) {
  return http.put(`/categories/${id}`, payload);
}

export async function deleteCategorytByIdAPI(id) {
  return http.delete(`/categories/${id}`);
}
