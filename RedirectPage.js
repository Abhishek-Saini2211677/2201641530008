import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { logEvent } from "./logger";

function RedirectPage() {
  const { code } = useParams();

  useEffect(() => {
    const entry = JSON.parse(localStorage.getItem(code));
    if (entry) {
      logEvent("frontend", "info", "component", `Redirecting to ${entry.url}`);
      window.location.href = entry.url;
    } else {
      logEvent("frontend", "error", "component", `Invalid short code: ${code}`);
      alert("Invalid short code!");
    }
  }, [code]);

  return <p>Redirecting...</p>;
}

export default RedirectPage;
