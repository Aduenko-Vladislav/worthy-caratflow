import { calculatePrice } from "../api/calculatePrice.js";
import { fetchSimilarDiamonds } from "../api/fetchSimilarDiamonds.js";
import { formToPrice, formToSimilar } from "../mappers/formToPayload.js";

async function fetchPriceByPayload(payload) {
  const { data } = await calculatePrice(payload);
  return data;
}

async function fetchSimilarByPayload(payload, limit = 4) {
  const items = await fetchSimilarDiamonds(payload);
  return Array.isArray(items) ? items.slice(0, limit) : [];
}

export async function getPrice(input) {
  const payload = input.carat ? formToPrice(input) : input;
  return fetchPriceByPayload(payload);
}

export async function getSimilar(input, limit = 4) {
  const payload = input.carat ? formToSimilar(input) : input;
  return fetchSimilarByPayload(payload, limit);
}

export async function getPriceThenSimilar(input, { onPrice } = {}) {
  const payload = input.carat ? formToSimilar(input) : input;

  const [priceRes, similarRes] = await Promise.allSettled([
    fetchPriceByPayload(payload),
    fetchSimilarByPayload(payload, 4),
  ]);

  if (priceRes.status === "fulfilled" && onPrice) {
    onPrice(priceRes.value);
  }

  return {
    price: priceRes.status === "fulfilled" ? priceRes.value : null,
    similar: similarRes.status === "fulfilled" ? similarRes.value : [],
  };
}
