const express = require('express');
const router = express.Router();
const needle = require('needle'); // Import needle for HTTP requests
require('dotenv').config(); // Load environment variables

// Environment variables
const API_BASE_URL = process.env.API_BASE_URL; // Example: 'https://api.fixer.io/latest'
const API_KEY_NAME = process.env.API_KEY_NAME; // Example: 'apikey'
const API_KEY_VALUE = process.env.API_KEY_VALUE; // Example: Your API key

// Route to handle currency conversion
router.get('/convert', async (req, res) => {
    const { base, target } = req.query; // Extract base and target currencies from query params

    const apiUrl = `${API_BASE_URL}?base=${base}&symbols=${target}`;

    try {
        const response = await needle('get', apiUrl, {
            headers: {
                'User-Agent': 'your-app-name', // Replace with your app name
                [API_KEY_NAME]: API_KEY_VALUE // Add API key header if required by the API
            }
        });

        if (response.statusCode === 200) {
            res.json(response.body); // Send JSON response back to client
        } else {
            throw new Error(`Request failed with status ${response.statusCode}`);
        }
    } catch (error) {
        res.status(500).json({ error: error.message }); // Handle errors gracefully
    }
});

module.exports = router;
