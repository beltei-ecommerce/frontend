import http from ".";

export async function fetchProductsAPI(params) {
  return http.get("/products", { params });
}

export async function getProductByIdAPI(id) {
  return http.get(`/products/${id}`);
}

export async function createProductAPI(payload) {
  return http.post("/products", payload);
}

export async function updateProductByIdAPI(id, payload) {
  return http.put(`/products/${id}`, payload);
}

export async function deleteProductByIdAPI(id) {
  return http.delete(`/products/${id}`);
}
