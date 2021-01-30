const houseDB = require("../data/dbConfig");

function getHouses() {
  // This is the equivalent of select * from houses
  return houseDB("houses");
}

function addHouse({
  house_type,
  house_address,
  house_description,
  house_price,
  for_rent,
}) {
  // This is the SQL equivalent of INSERT INTO houses (house_type, house_address, house_description,house_price, for_rent) VALUES (data to be added)
  return houseDB("houses").insert({
    house_type,
    house_address,
    house_description,
    house_price,
    for_rent,
  });
}

function removeHouse(id) {
  // This is the SQL equivalent of DELETE FROM houses WHERE id =id
  return houseDB("houses").where({ id }).del();
}

function getHouseById(id) {
  return houseDB("houses").where({ id }).first();
}

// Helper function to edit a house
function updateHouse({
  id,
  house_type,
  house_address,
  house_description,
  house_price,
  for_rent,
}) {
  return houseDB("houses").where({ id }).update({
    house_type,
    house_address,
    house_description,
    house_price,
    for_rent,
  });
}

module.exports = {
  getHouses,
  addHouse,
  removeHouse,
  getHouseById,
  updateHouse,
};
