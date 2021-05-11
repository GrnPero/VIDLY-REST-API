// Uses Joi and express in this node application
const home = require('./routes/home');
const genres = require('./routes/genres');
const customers = require('./routes/customers');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/vidly', {useNewUrlParser: true, useUnifiedTopology: true}) 
    .then(() => console.log('Connected to MongoDB...')) 
    .catch(err => console.error('Could not connect to MongoDB...', err));
mongoose.set('useFindAndModify', false);

const express = require('express');
const app = express();

// Uses express json
app.use(express.json());
app.use('/', home);
app.use('/api/genres', genres);
app.use('/api/customers', customers);

// Starts up the development server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
