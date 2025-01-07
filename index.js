const express = require('express');
const cors = require('cors');
const querystring = require('querystring');
const axios = require('axios');

const app = express();

app.use(cors());

// Spotify API credentials
const CLIENT_ID = 'your_spotify_client_id';
const CLIENT_SECRET = 'your_spotify_client_secret';
const REDIRECT_URI = 'com.yogaxd.aurality://callback';

// Spotify login route
app.get('/login', (req, res) => {
    const scope = 'user-read-private user-read-email';
    const authUrl = `https://accounts.spotify.com/authorize?${querystring.stringify({
        response_type: 'code',
        client_id: CLIENT_ID,
        scope: scope,
        redirect_uri: REDIRECT_URI,
    })}`;

    res.redirect(authUrl);
});

// Spotify callback route
app.get('/callback', async (req, res) => {
    const code = req.query.code || null;

    if (!code) {
        return res.status(400).send('Authorization code not found.');
    }

    try {
        // Exchange authorization code for access token
        const tokenResponse = await axios.post('https://accounts.spotify.com/api/token', querystring.stringify({
            code: code,
            redirect_uri: REDIRECT_URI,
            grant_type: 'authorization_code',
        }), {
            headers: {
                Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        const { access_token } = tokenResponse.data;

        // Redirect back to the app with access token
        res.redirect(`${REDIRECT_URI}?access_token=${access_token}`);
    } catch (error) {
        console.error('Error exchanging code for token:', error.response?.data || error.message);
        res.status(500).send('Failed to authenticate with Spotify.');
    }
});

app.get('/', (req, res) => {
    res.send('Aurality Backend is running!');
});

// Export for Vercel
module.exports = app;
