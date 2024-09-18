import http from ".";

export async function fetchCartsAPI(params) {
  return http.get("/carts", { params });
}

export async function getCartByIdAPI(id) {
  return http.get(`/carts/${id}`);
}

export async function createCarttAPI(payload) {
  return http.post("/carts", payload);
}

export async function updateCarttByIdAPI(id, payload) {
  return http.put(`/carts/${id}`, payload);
}

export async function deleteCarttByIdAPI(id) {
  return http.delete(`/carts/${id}`);
}
