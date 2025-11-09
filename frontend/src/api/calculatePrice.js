import axios from "axios";
import axiosRetry from "axios-retry";

const BASE_URL = "http://localhost:3500";

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10_000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

axiosRetry(api, {
  retries: 3,
  shouldResetTimeout: true,
  retryDelay: axiosRetry.exponentialDelay,
  retryCondition: (error) =>
    axiosRetry.isNetworkOrIdempotentRequestError(error) ||
    (error.response && error.response.status >= 500),
});

export async function calculatePrice(payload) {
  try {
    const { data } = await api.post("/price/calculate", payload);
    return data;
  } catch (err) {
    console.error("Calculate error:", err.message);
    throw err;
  }
}
