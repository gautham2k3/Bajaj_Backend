const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import CORS package

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all requests
app.use(cors());

// Middleware for parsing JSON
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.status(200).send('Use /bfhl for GET and POST requests.');
});

app.post('/bfhl', (req, res) => {
    try {
        const { data } = req.body;

        if (!Array.isArray(data)) {
            return res.status(400).json({
                is_success: false,
                message: "Invalid input format. 'data' must be an array."
            });
        }

        const numbers = data.filter(item => !isNaN(item));
        const alphabets = data.filter(item => /^[a-zA-Z]$/.test(item));
        const highestAlphabet = alphabets.length > 0 
            ? [alphabets.sort((a, b) => b.toLowerCase().localeCompare(a.toLowerCase()))[0]]
            : [];

        const response = {
            is_success: true,
            user_id: "gautham",
            email: "22bct10003@cuchd.in",
            roll_number: "22BCT10003",
            numbers,
            alphabets,
            highest_alphabet: highestAlphabet
        };

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({
            is_success: false,
            message: "An error occurred.",
            error: error.message
        });
    }
});

// Handle OPTIONS preflight request
app.options('/bfhl', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.status(200).end();
});

app.get('/bfhl', (req, res) => {
    res.status(200).json({ operation_code: 1 });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;
