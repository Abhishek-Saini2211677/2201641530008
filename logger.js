const BASE_URL = "http://20.244.56.144/evaluation-service/logs";

let authToken = null;

export const setAuthToken = (token) => {
  authToken = token;
};

export const logEvent = async (stack, level, pkg, message) => {
  if (!authToken) {
    console.error("Auth token not set. Cannot send log.");
    return;
  }

  try {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        stack,
        level,
        package: pkg,
        message,
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      console.error("Log API failed:", data);
    }
  } catch (err) {
    console.error("Logging error:", err.message);
  }
};
