// The db-config has knowledge of our knex file. It is where our configuration is done
const knex = require("knex");
const config = require("../knexfile");

const env = process.env.NODE._ENV || "development";

const configOptions = config[env];

// Export the configuration file
module.exports = knex(configOptions);
