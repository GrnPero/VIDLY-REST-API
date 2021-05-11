const express = require('express');
const router = express.Router(); 

// Welcomes the user to the service
router.get('/', (req, res) => {
    res.send('Welcome to VIVLY genre API');
});

module.exports = router;
