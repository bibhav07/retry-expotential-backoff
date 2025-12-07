const fetch = require("node-fetch");
import retryWithBackoff from "./withRetry";

async function callPaymentAPI() {
  return await retryWithBackoff(async () => {
    const response = await fetch("https://api.example.com/pay", { method: "POST" });
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    return response.json();
  }, { retries: 5, baseDelay: 1000, jitter: true });
}

(async () => {
  try {
    const result = await callPaymentAPI();
    console.log("Payment success:", result);
  } catch (err) {
    console.error("Payment failed:", err.message);
  }
})();
