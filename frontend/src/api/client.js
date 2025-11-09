import axios from "axios";
import axiosRetry from "axios-retry";

export const api = axios.create({
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
    console.error("API error:", err.message);
    throw err;
  }
}
