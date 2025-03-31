// db.js
const mongoose = require('mongoose');

// Replace with your MongoDB connection string
const mongoURI = 'mongodb+srv://root:root@cluster-1.tdg4iut.mongodb.net/international';

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected successfully'))
    .catch((err) => console.error('MongoDB connection error:', err));

module.exports = mongoose;