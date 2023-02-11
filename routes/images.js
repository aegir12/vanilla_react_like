const express = require('express');
const router = express.Router();

// Route for handling GET requests to /images
router.get('/', (req, res) => {
  // Your logic for handling the request goes here
  res.json({"images": 1})
});

module.exports = router;
