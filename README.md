# In exponential backoff, this multiplier is applied to your base delay.
# Example: If base delay = 500 ms, then at attempt 4:
# This ensures retries don’t hammer the server but instead wait progressively longer.


let delay = baseDelay * Math.pow(2, attempt);

baseDelay → the starting wait time (e.g., 500 ms or 1 second).
attempt → the retry number (1st, 2nd, 3rd…).
Math.pow(2, attempt) → raises 2 to the power of the attempt number.

# So the delay grows like this:
    Attempt 1 → baseDelay * 2^1 → 500 ms × 2 = 1,000 ms (1s)
    Attempt 2 → baseDelay * 2^2 → 500 ms × 4 = 2,000 ms (2s)
    Attempt 3 → baseDelay * 2^3 → 500 ms × 8 = 4,000 ms (4s)
    Attempt 4 → baseDelay * 2^4 → 500 ms × 16 = 8,000 ms (8s)

That’s why it’s called exponential backoff — the wait time doubles each retry.


-> What is Jitter?
Jitter means adding a small random variation to the delay.

# Why?
   -> Imagine thousands of clients all retrying at exactly 2s, 4s, 8s…
   -> They’d all hit the server at the same time → “retry storm.”
   -> Jitter spreads retries out randomly, so the server load is smoother.


# Example:
    -> Without jitter:
    Retry 1 → wait 1000 ms
    Retry 2 → wait 2000 ms
    Retry 3 → wait 4000 ms

    -> With jitter:
    Retry 1 → wait 950 ms
    Retry 2 → wait 2150 ms
    Retry 3 → wait 3870 ms

