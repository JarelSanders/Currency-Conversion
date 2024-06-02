const express = require('express');
const url = require('url');
const needle = require('needle');
const apicache = require('apicache');

const router = express.Router();

// Environment variables
const API_BASE_URL = process.env.API_BASE_URL;
const API_KEY_NAME = 'apikey'; // Fixed value as per the API's documentation
const API_KEY_VALUE = process.env.API_KEY_VALUE;

// Initialize cache
let cache = apicache.middleware;

// Define a route for the API
router.get('/', cache('2minutes'), async (req, res) => {
  try {
    // Prepare the query parameters from the request
    const params = new URLSearchParams({
      ...url.parse(req.url, true).query
    });

    // Construct the API request URL
    const apiUrl = `${API_BASE_URL}?${params}`;
    console.log('API Request URL:', apiUrl); // Log the final API request URL for debugging

    // Make the API request with the API key in the headers
    const apiRes = await needle('get', apiUrl, {
      headers: {
        [API_KEY_NAME]: API_KEY_VALUE  // Use the API key name from environment variable
      }
    });

    const data = apiRes.body;

    // Send the response back to the client
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
