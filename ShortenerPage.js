import React, { useState } from "react";
import { logEvent } from "./logger";
import { validateURL, generateShortCode } from "./utils";

function ShortenerPage() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const handleShorten = () => {
    if (!validateURL(url)) {
      logEvent("frontend", "error", "component", `Invalid URL entered: ${url}`);
      alert("Invalid URL!");
      return;
    }

    const code = generateShortCode();
    const shortLink = `${window.location.origin}/r/${code}`;

    localStorage.setItem(code, JSON.stringify({ url, createdAt: Date.now() }));
    setShortUrl(shortLink);

    logEvent("frontend", "info", "api", `Shortened URL created: ${shortLink}`);
  };

  return (
    <div>
      <h2>Shorten a URL</h2>
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter URL"
      />
      <button onClick={handleShorten}>Shorten</button>
      {shortUrl && (
        <p>
          Short URL: <a href={shortUrl}>{shortUrl}</a>
        </p>
      )}
    </div>
  );
}

export default ShortenerPage;
