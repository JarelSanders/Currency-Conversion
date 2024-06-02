// Import the express module, which is a web framework for Node.js
const express = require('express')

// Import the cors module to handle Cross-Origin Resource Sharing
const cors = require('cors')

// Import the express-rate-limit module to limit repeated requests to public APIs and/or endpoints
const rateLimit = require('express-rate-limit')

// Import the dotenv module to load environment variables from a .env file into process.env
require('dotenv').config()

// Will check to see if I have an environment variable called PORT. If not, will use port 5000
const PORT = process.env.PORT || 5000

// Initialize express application
const app = express()

// Define rate limiting settings
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 9, // Limit each IP to 3 requests per windowMs
})


// Set static folder to serve static files from the 'src' directory
app.use(express.static('src'))

// Apply the rate limiting middleware to all requests
app.use(limiter)

// Trust the first proxy when running behind a proxy
app.set('trust proxy', 1)

// Define routes, using the routes defined in the 'routes' module
app.use('/api', require('./routes'))

// Enable CORS for all routes
app.use(cors())

// Start the server and listen on the defined PORT
app.listen(PORT, () => 
    console.log(`Server running on port ${PORT}`)
)
