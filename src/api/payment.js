import http from ".";

export async function createPaymentAPI(payload) {
  return http.post("/payments", payload);
}
