import http from ".";

export async function fetchCartsAPI(params) {
  return http.get("/carts", { params });
}

export async function getCartByIdAPI(id) {
  return http.get(`/carts/${id}`);
}

export async function createCartAPI(payload) {
  return http.post("/carts", payload);
}

export async function updateCartByIdAPI(id, payload) {
  return http.put(`/carts/${id}`, payload);
}

export async function deleteCartByIdAPI(id) {
  return http.delete(`/carts/${id}`);
}
