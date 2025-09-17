// utils/api.js

const BASE_URL = "http://localhost:5000/api"; // adjust backend URL

// Generic request helper
async function request(endpoint, options = {}) {
  const res = await fetch(`${BASE_URL}/${endpoint}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }
  return res.json();
}

// CRUD helpers
export function get(endpoint) {
  return request(endpoint, { method: "GET" });
}

export function post(endpoint, data) {
  return request(endpoint, { method: "POST", body: JSON.stringify(data) });
}

export function patch(endpoint, data) {
  return request(endpoint, { method: "PATCH", body: JSON.stringify(data) });
}

export function del(endpoint) {
  return request(endpoint, { method: "DELETE" });
}
