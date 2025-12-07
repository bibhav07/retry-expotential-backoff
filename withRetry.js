
async function retryWithBackoff(fn, { retries = 5, baseDelay = 500, jitter = true } = {}) {
  let attempt = 0;

  while (attempt < retries) {
    try {
      return await fn(); // Try the function
    } catch (err) {
      attempt++;
      if (attempt >= retries) {
        throw new Error(`Failed after ${retries} retries: ${err.message}`);
      }

      // Calculate exponential delay
      let delay = baseDelay * Math.pow(2, attempt);

      // Add jitter (random variation)
      if (jitter) {
        const jitterValue = Math.floor(Math.random() * delay * 0.2); // up to 20% jitter
        delay += jitterValue;
      }

      console.log(`Attempt ${attempt} failed. Retrying in ${delay}ms...`);
      await new Promise(res => setTimeout(res, delay));
    }
  }
}

module.exports = retryWithBackoff;