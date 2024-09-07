import http from ".";

export async function loginAPI(payload) {
  return http.post("/auth/login", payload);
}

export async function fetchUserAPI() {
  return http.get("/auth/whoami");
}
