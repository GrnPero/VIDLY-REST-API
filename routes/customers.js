const { Customer, validate } = require('../models/customer');
const mongoose = require('mongoose');
const express = require('express'); 
const router = express.Router(); 

// Grabs all the customers from the database
router.get('/', async (req, res) => {
    const customers = await Customer
        .find();

    res.send(customers);
});

// Finds customer in the database based on id
router.get('/:id', async (req, res) => {
    // Searches the database of customer based on id
    try {
        const customer = await Customer
            .findById(req.params.id)
        return res.send(customer);
    } catch (err) {
        // If not found return a 404 
        return res.status(404).send('The customer with the given ID was not found');
    }
});

// Adds a customer to the database
router.post('/', async (req, res) => {
    // Finds if user input returns an error
    const { error } = validate(req.body);

    // Checks if an error exists
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    // Creates the Customer model based on user request
    const customer = new Customer({
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
    });

    // If request is valid save to the database
    try {
        const result = await customer.save();
        console.log(result);
    } catch (ex) {
        for (fields in ex.errors) {
            console.log(ex.errors[field].message);
        }
    } 

    // Send created customer as a JSON response
    res.send(customer);
});

// Finds the user ID then updates the customer
router.put('/:id', async (req, res) => {
    // Finds if an error exist for the req
    const { error } = validate(req.body);

    // Check if their is an error in this request
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    // Searches for the id in the database, if not found return a 404
    try {
        let customer = await Customer.findById(req.params.id);

        // Updates: name, phone, isGold
        customer.name = req.body.name;
        customer.phone = req.body.phone;
        customer.isGold = req.body.isGold;
        const result = await customer.save();

        // Returns a response of the customer that has been updated
        res.send(result);
    } catch (ex) {
        return res.status(404).send('The genre with the given ID was not found');
    }
});

// Deletes the customer by id
router.delete('/:id', async (req, res) => {
    // Searches for the id in the database, returns a 404 if not found
    try {
        const customer = await Customer.findByIdAndRemove(req.params.id);

        // Returns a reponse of the deleted customer
        res.send(customer);
    } catch (ex) {
        res.status(404).send('The genre with the given ID was not found!');
    }
});

module.exports = router;
