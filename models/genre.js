const Joi = require('joi');
const mongoose = require('mongoose');

// Creates the Genre model
const Genre = mongoose.model('Genre', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255
    }
}));

// Validates user input 
function validateGenre(genre) { 
    // Creates the schema object for the user requested genre 
    const schema = Joi.object({ 
        name: Joi.string().min(3).required() 
    }); 
 
    // Returns if their is an error with the user input 
    return schema.validate(genre); 
}

exports.Genre = Genre;
exports.validate = validateGenre;
