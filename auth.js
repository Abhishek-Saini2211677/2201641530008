const AUTH_URL = "http://20.244.56.144/evaluation-service/auth";

export const getAuthToken = async (credentials) => {
  try {
    const res = await fetch(AUTH_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    const data = await res.json();
    if (res.ok && data.access_token) {
      return data.access_token;
    } else {
      throw new Error(data.message || "Auth failed");
    }
  } catch (err) {
    console.error("Auth error:", err.message);
    return null;
  }
};
