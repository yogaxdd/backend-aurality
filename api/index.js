const express = require('express');
const axios = require('axios');
const querystring = require('querystring');

const app = express();

// API keys dan Redirect URI dari Spotify (gunakan di Vercel Environment Variables)
const CLIENT_ID = process.env.CLIENT_ID || '1f13df46fabb406fb36044a8710115dd';
const CLIENT_SECRET = process.env.CLIENT_SECRET || 'a645f30e237d43d2a805b78d2f9bb3e3';
const REDIRECT_URI = process.env.REDIRECT_URI || 'com.yogaxd.aurality://callback';

// Endpoint untuk mengecek server
app.get('/', (req, res) => {
    res.send('Aurality backend is running!');
});

// Endpoint login untuk Spotify
app.get('/login', (req, res) => {
    const scope = 'user-read-private user-read-email';
    const queryParams = querystring.stringify({
        response_type: 'code',
        client_id: CLIENT_ID,
        scope,
        redirect_uri: REDIRECT_URI,
    });

    res.redirect(https://accounts.spotify.com/authorize?${queryParams});
});

// Callback setelah login Spotify
app.get('/callback', async (req, res) => {
    const code = req.query.code || null;

    if (!code) {
        return res.status(400).send('No code provided.');
    }

    try {
        // Tukarkan kode dengan Access Token
        const tokenResponse = await axios.post(
            'https://accounts.spotify.com/api/token',
            querystring.stringify({
                grant_type: 'authorization_code',
                code: code,
                redirect_uri: REDIRECT_URI,
            }),
            {
                headers: {
                    Authorization: Basic ${Buffer.from(${CLIENT_ID}:${CLIENT_SECRET}).toString('base64')},
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
        );

        const { access_token } = tokenResponse.data;

        // Redirect ke aplikasi dengan access token
        res.redirect(${REDIRECT_URI}?access_token=${access_token});
    } catch (error) {
        console.error('Error saat mendapatkan access token:', error.response?.data || error.message);
        res.status(500).send('Failed to authenticate with Spotify.');
    }
});

// Export untuk Vercel
module.exports = app;

nih dah bener kan?
btw di api/index.js ini

ini vercel.json
{
  "version": 2,
  "routes": [
    { "src": "/(.*)", "dest": "/api/index.js" }
  ]
}

dahh apalagi? ini udh bener, btw klo buat kode baru kamu copy id nya yg atas aku cape copas dri spotify mulu
