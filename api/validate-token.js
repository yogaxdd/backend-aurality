export default function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const { accessToken } = req.body;

            if (!accessToken) {
                return res.status(400).json({ error: 'Access Token is required' });
            }

            // Simulasi validasi access token
            if (accessToken === 'VALID_TOKEN') {
                return res.status(200).json({
                    success: true,
                    user: {
                        id: '12345',
                        name: 'Test User',
                        email: 'testuser@example.com',
                    },
                });
            } else {
                return res.status(401).json({ error: 'Invalid Access Token' });
            }
        } catch (error) {
            console.error('Server Error:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }
}
