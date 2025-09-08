import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ShortenerPage from "./ShortenerPage";
import StatsPage from "./StatsPage";
import RedirectPage from "./RedirectPage";
import { getAuthToken } from "./auth";
import { setAuthToken } from "./logger";

function App() {
  useEffect(() => {
    const initAuth = async () => {
      const token = await getAuthToken({
        email: "your_email",
        name: "your_name",
        rollNo: "your_rollno",
        accessCode: "your_accessCode",
        clientID: "your_clientID",
        clientSecret: "your_clientSecret"
      });
      if (token) setAuthToken(token);
    };
    initAuth();
  }, []);

  return (
    <Router>
      <nav>
        <Link to="/">Shorten</Link> |{" "}
        <Link to="/stats">Stats</Link>
      </nav>
      <Routes>
        <Route path="/" element={<ShortenerPage />} />
        <Route path="/stats" element={<StatsPage />} />
        <Route path="/r/:code" element={<RedirectPage />} />
      </Routes>
    </Router>
  );
}

export default App;
