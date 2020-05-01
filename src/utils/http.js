import axios from "axios";
import { BASE_URL } from "./constants";

export const request = axios.create({
  headers: {
    "Content-Type": "application/json"
  }
});

function getToken() {
  return localStorage.getItem("token");
}

export function setupHttpConfig() {
  request.defaults.baseURL = BASE_URL;
  request.defaults.timeout = 5000;
  const token = getToken();
  if (token) {
    request.defaults.headers.Authorization = `Bearer ${token}`;
  }
  // request.defaults.headers.Authorization = `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNTgxNTc3MDkxLCJqdGkiOiJjMzVhZjJlM2U0Yzk0OTRiYWZmMDU4MTU0NGU3MzI5YyIsInVzZXJfaWQiOjF9.0etLCNFrkh63mK8otc4sHqgwBPWHBippV5XqrphMITo`;
}

export function convertToFormData(payload) {
  const formData = new FormData();
  const items = Object.keys(payload);
  items.forEach(key => {
    formData.append(key, payload[key]);
  });
  return formData;
}
