// server.js
const express = require('express');
const mongoose = require('./api/db'); // Assuming your MongoDB connection file is named db.js

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});