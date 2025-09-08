import React, { useState, useEffect } from "react";
import { logEvent } from "./logger";

function StatsPage() {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    try {
      const keys = Object.keys(localStorage);
      const data = keys.map((k) => {
        const { url, createdAt } = JSON.parse(localStorage.getItem(k));
        return { code: k, url, createdAt };
      });
      setStats(data);
      logEvent("frontend", "info", "component", "Loaded stats page");
    } catch (err) {
      logEvent("frontend", "error", "component", "Failed loading stats");
    }
  }, []);

  return (
    <div>
      <h2>URL Stats</h2>
      <ul>
        {stats.map((s) => (
          <li key={s.code}>
            <strong>{s.code}</strong>: {s.url} (created {new Date(s.createdAt).toLocaleString()})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StatsPage;
