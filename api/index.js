const express = require('express');
const axios = require('axios');
const querystring = require('querystring');

const app = express();

// Spotify API Keys (gunakan Environment Variables di Vercel)
const CLIENT_ID = process.env.CLIENT_ID || '1f13df46fabb406fb36044a8710115dd';
const CLIENT_SECRET = process.env.CLIENT_SECRET || 'a645f30e237d43d2a805b78d2f9bb3e3';
const REDIRECT_URI = process.env.REDIRECT_URI || 'com.yogaxd.aurality://callback';

// Step 1: Endpoint untuk Login
app.get('/login', (req, res) => {
    const scope = 'user-read-private user-read-email';
    const authUrl = `https://accounts.spotify.com/authorize?${querystring.stringify({
        response_type: 'code',
        client_id: CLIENT_ID,
        scope,
        redirect_uri: REDIRECT_URI,
    })}`;
    res.redirect(authUrl);
});

// Step 2: Endpoint untuk menerima Callback
app.get('/callback', async (req, res) => {
    const code = req.query.code || null;

    if (!code) {
        return res.status(400).send('Authorization code not found.');
    }

    try {
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
        console.log('Access token berhasil didapat:', access_token);

        res.redirect(`${REDIRECT_URI}?access_token=${access_token}`);
    } catch (error) {
        console.error('Error exchanging code for token:', error.response?.data || error.message);
        res.status(500).send('Failed to authenticate with Spotify.');
    }
});

// Step 3: Health Check Endpoint
app.get('/', (req, res) => {
    res.send('Backend Aurality berjalan dengan baik!');
});

// Vercel-specific: gunakan port default
module.exports = app;
