const { Genre, validate } = require('../models/genre');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

// Shows the user all the available services
router.get('/', async (req, res) => {
    const genres = await Genre
        .find();

    res.send(genres);
});

// Returns the genre based on the id the user requested
router.get('/:id', async (req, res) => {
    // Finds the id of the genre in the MongoDB database
    try {
        const genre = await Genre
            .find({ _id: req.params.id });
        // If genre with the requested ID is found in the database send a response with the genre
        res.send(genre);
    } catch (ex) {
        // Returns a 404 if the requested id is not found in the database
        return res.status(404).send('The genre with the given ID was not found');
    }
});

// Allows the user to add the genre to the genres array with the POST route
router.post('/', async (req, res) => {
    // Finds if an error exist 
    const { error } = validate(req.body);

    // Checks if an error exist in this request
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    // Create the Genre model object based on user request 
    const genre = new Genre({
        name: req.body.name
    });

    // Save to the database if req is valid
    try {
        const result = await genre.save();
        console.log(result);
    } catch (ex) {
        for (field in ex.errors) {
            console.log(ex.errors[field].message)
        }
    }

    // Send the user created genre back to the user
    res.send(genre);
});

// Updates the genre based on ID provided by the user
router.put('/:id', async (req, res) => {
    // Finds if an error exist 
    const { error } = validate(req.body);

    // Checks if an error exist in this request
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    // Matches the requested id with the id in the database if available
    try {
        let genre = await Genre.findById(req.params.id);

        // Updates the genre name from the request then saves the changes to the database
        genre.name = req.body.name;
        const result = await genre.save();

        // Sends the user the genre they submitted
        res.send(result);
    } catch (ex) {
        return res.status(404).send('The genre with the given ID was not found');
    }
});

// Deletes the genre from the database based on the ID the user provided
router.delete('/:id', async (req, res) => {
    // Finds if the genre exists in the database
    try {
        const genre = await Genre.findByIdAndRemove(req.params.id); 
        // Return the course that was deleted
        res.send(genre);
    } catch (ex) {
        // If genre not found return 404
        res.status(404).send('The genre with the given ID was not found!');
    }
});

module.exports = router;
