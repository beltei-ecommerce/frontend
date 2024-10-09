import http from ".";

export async function fetchAddressesAPI(params) {
  return http.get("/addresses", { params });
}

export async function getAddressByIdAPI(id) {
  return http.get(`/addresses/${id}`);
}

export async function createAddressAPI(payload) {
  return http.post("/addresses", payload);
}

export async function updateAddressByIdAPI(id, payload) {
  return http.put(`/addresses/${id}`, payload);
}

export async function deleteAddressByIdAPI(id) {
  return http.delete(`/addresses/${id}`);
}
