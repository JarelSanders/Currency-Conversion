const express = require('express');
const router = express.Router();
const needle = require('needle'); // Import needle for HTTP requests
require('dotenv').config(); // Load environment variables

// Environment variables
const API_BASE_URL = process.env.API_BASE_URL; 
const API_KEY_NAME = process.env.API_KEY_NAME; 
const API_KEY_VALUE = process.env.API_KEY_VALUE; 

// Route to handle currency conversion
router.get('/convert', async (req, res) => {
    const { from, to, amount } = req.query; // Extract base and target currencies from query params

    const apiUrl = `${API_BASE_URL}?from=${from}&to=${to}&amount${amount}`;

    try {
        const response = await needle('get', apiUrl, {
            headers: {
                
                 API_KEY_VALUE //API key value  
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
