const express = require('express');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const router = express.Router();

const client = new OAuth2Client('YOUR_GOOGLE_CLIENT_ID');  // Replace with your Google client ID
const JWT_SECRET = 'your_jwt_secret';  // Replace with your own secret

// Login route
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    // Assume a function validateUser that verifies username and password
    const user = validateUser(username, password);
    if (user) {
        // Create JWT token
        const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });
        return res.json({ success: true, token });
    }
    res.status(401).json({ success: false, message: 'Invalid credentials' });
});

// Google OAuth route
router.post('/google', async (req, res) => {
    const { idToken } = req.body;
    const ticket = await client.verifyIdToken({ idToken, audience: 'YOUR_GOOGLE_CLIENT_ID' });
    const payload = ticket.getPayload();
    const userId = payload['sub'];  // Use Google's user ID

    // Create JWT token for the user
    const token = jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ success: true, token });
});

module.exports = router;
