const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.status(200).send('Welcome to the Bajaj Finserv Health Dev Challenge API! Use /bfhl for GET and POST requests.');
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


app.get('/bfhl', (req, res) => {
    res.status(200).json({ operation_code: 1 });
});

module.exports = app;
