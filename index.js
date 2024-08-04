const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv');
const needle = require('needle');
const path = require('path');

// Load environment variables from .env file
dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

// Middleware: Logging HTTP requests
app.use(morgan('dev'));

// Rate limiting middleware
const limiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 10, // Limit each IP to 10 requests per minute
    message: 'Too many requests from this IP, please try again after a minute'
});
app.use('/api', limiter);

// Trust the first proxy when running behind a proxy
app.set('trust proxy', 1);

// Middleware: Enable CORS
app.use(cors());

// Serve Angular static files from the 'dist' directory
app.use(express.static(path.join(__dirname, 'dist', 'currency-conversion')));

// Serve index.html for all routes (SPA routing)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'currency-conversion', 'index.html'));
});

// Route to handle currency conversion using external API
// app.use('/api', require('./routes/index'));

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


 