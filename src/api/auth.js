import http from ".";

export async function loginAPI(payload) {
  return http.post("/auth/login", payload);
}

export async function fetchUserAPI() {
  return http.get("/auth/whoami");
}

export async function registerAPI(payload) {
  return http.post("/auth/register", payload);
}

export async function updateUserAPI(payload) {
  return http.put("/auth/user", payload);
}

export async function verifyResetPasswordAPI(params) {
  return http.get("/auth/verify_reset_password", { params });
}

export async function resetPasswordAPI(payload) {
  return http.post("/auth/reset_password", payload);
}

export async function sendRequestResetPasswordAPI(payload) {
  return http.post("/auth/send_request_reset_password", payload);
}
