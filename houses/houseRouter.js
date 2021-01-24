const express = require("express");
const authentication = require("../auth/middleware/authenticate-middleware");
// To check if the user is an agent or not
const checkAgent = require("../auth/middleware/checkAgent");

// Import the helper functions and save it in a variable
const house = require("./houseDB");

// Bring in the router
const router = express.Router();

// Endpoint for getting houses
router.get("/", authentication, (req, res) => {
  house
    .getHouses()
    .then((house) => {
      res.status(200).json(house);
    })
    .catch((error) => {
      res.status(404).json({ stack: error.stack, message: error.message });
    });
});

router.post("/", authentication, checkAgent, (req, res) => {
  // We are adding a new house so we need req.body
  const {
    id,
    house_type,
    house_address,
    house_description,
    house_price,
    for_rent,
  } = req.body;
  const newHouse = {
    id,
    house_type,
    house_address,
    house_description,
    house_price,
    for_rent,
  };
  house
    .addHouse(newHouse)
    .then((house) => {
      res.status(200).json({ message: `House added successfully`, newHouse });
    })
    .catch((error) => {
      res.status(500).json({ message: error.message, stack: error.stack });
    });
});
module.exports = router;
