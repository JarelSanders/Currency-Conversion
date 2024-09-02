const express = require('express');
const router = express.Router();
const needle = require('needle'); // Import needle for HTTP requests
require('dotenv').config(); // Load environment variables

// Environment variables
const API_BASE_URL = process.env["API_BASE_URL"];
const API_KEY_VALUE = process.env["API_KEY"]; 


console.log(`API URL: ${apiUrl}`);
console.log(`Headers:`, {
  apikey: API_KEY_VALUE,
  "Cache-Control": "no-cache",
});

// Route to handle currency conversion
router.get('/convert', async (req, res) => {
    const { first_currency, second_currency, final_amount } = req.query; // Extract base and target currencies from query params
    const apiUrl = `${API_BASE_URL}?to=${first_currency}&from=${second_currency}&amount=${final_amount}`;
    console.log(`API_BASE_URL: ${API_BASE_URL}`);
    console.log(`API_KEY_VALUE: ${API_KEY_VALUE}`);

    try {
        const response = await needle('GET', apiUrl, {
            headers: {
                
                'apikey': API_KEY_VALUE, //API key value  
                'Cache-Control': 'no-cache'
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
