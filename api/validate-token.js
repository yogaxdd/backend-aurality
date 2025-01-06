const express = require("express");
const app = express();

app.use(express.json());

// Endpoint untuk validasi token
app.post("/validate-token", (req, res) => {
  const { accessToken } = req.body;

  if (!accessToken) {
    return res.status(400).json({ error: "Access Token not provided" });
  }

  // Simulasi validasi token
  if (accessToken.startsWith("BQ")) {
    return res.json({
      success: true,
      user: {
        id: "spotify_user_id",
        display_name: "Spotify User",
        email: "user@example.com",
      },
    });
  } else {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
});

// Default route untuk memastikan server berjalan
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

module.exports = app;
