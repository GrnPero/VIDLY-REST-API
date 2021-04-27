const Joi = require('joi');
const express = require('express');
const router = express.Router();

// Our fake database for genres stored in an array
const genres = [ 
    { id: 1, name: 'action' },
    { id: 2, name: 'comedy' },
    { id: 3, name: 'horror' },
    { id: 4, name: 'romance' }
];

// Shows the user all the available services
router.get('/', (req, res) => {
    res.send(genres);
});

// Returns the genre based on the id the user requested
router.get('/:id', (req, res) => {
    // Matches the requested id with the id in the array if available
    const genre = genres.find(g => g.id === parseInt(req.params.id));

    // Returns a 404 if the requested id is not found in the array
    if (!genre) {
        return res.status(404).send('The genre with the given ID was not found');
    }

    // If genre with the requested ID is found return the genre
    res.send(genre);
});

// Allows the user to add the genre to the genres array with the POST route
router.post('/', (req, res) => {
    // Finds if an error exist 
    const { error } = validateGenre(req.body);

    // Checks if an error exist in this request
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    // Create the genre object based on user request
    const genre = {
        id: genres.length + 1,
        name: req.body.name
    };

    // Push the genre to the array
    genres.push(genre);
    // Send the user created genre back to the user
    res.send(genre);
});

// Updates the genre based on ID provided by the user
router.put('/:id', (req, res) => {
    // Matches the requested id with the id in the array if available
    const genre = genres.find(g => g.id === parseInt(req.params.id));

    // Returns a 404 if the requested id is not found in the array
    if (!genre) {
        return res.status(404).send('The genre with the given ID was not found');
    }

    // Finds if an error exist 
    const { error } = validateGenre(req.body);

    // Checks if an error exist in this request
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    // Updates the genre name with the user requested genre based on ID
    genre.name = req.body.name;
    // Sends the user the genre they submitted
    res.send(genre);
});

// Validates user input
function validateGenre(genre) {
    // Creates the schema object for the user requested genre
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });

    // Returns if their is an error with the user input
    return schema.validate(genre);
}

// Deletes the genre from the array based on the ID the usere provided
router.delete('/:id', (req, res) => {
    // Finds if the genre exists in the genres array
    const genre = genres.find(g => g.id === parseInt(req.params.id));

    // If genre not found return 404
    if (!genre) {
        return res.status(404).send('The genre with the given ID was not found!');
    }

    // Finds the object based on the index ID
    const index = genres.indexOf(genre);

    // Remove the genre off the array
    genres.splice(index, 1);

    // Return the course that was deleted
    res.send(genre);
});

module.exports = router;
