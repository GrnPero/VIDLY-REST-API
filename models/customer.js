const Joi = require('joi');
const mongoose = require('mongoose');

// Creates the Customer schema
const Customer = mongoose.model('Customer', new mongoose.Schema({
    isGold: { 
        type: Boolean, 
        default: false
    },  
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255 
    },  
    phone: {
        type: String,
        required: true, 
        minlength: 5,
        maxlength: 255 
    }   
}));

// Validates user input
function validateCustomer(customer) {
    // Creates the schema object for the user requested genre
    const schema = Joi.object({
        name: Joi.string().min(5).max(255).required(),
        phone: Joi.string().min(5).max(255).required(),
        isGold: Joi.boolean()
    });

    // Returns if their is an error with the user input
    return schema.validate(customer);
}

exports.Customer = Customer;
exports.validate = validateCustomer;
