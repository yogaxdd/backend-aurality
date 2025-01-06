const fetch = require("node-fetch");

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { accessToken } = req.body;

  if (!accessToken) {
    return res.status(400).json({ error: "Access Token not provided" });
  }

  try {
    const spotifyResponse = await fetch("https://api.spotify.com/v1/me", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (spotifyResponse.status === 200) {
      const userData = await spotifyResponse.json();
      return res.status(200).json({ success: true, user: userData });
    } else {
      return res.status(401).json({ error: "Invalid or expired token" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
