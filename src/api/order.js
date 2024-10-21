import http from ".";

export async function fetchOrdersAPI(params) {
  return http.get("/orders", { params });
}

export async function deleteOrderByIdAPI(id) {
  return http.delete(`/orders/${id}`);
}
