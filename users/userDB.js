// Bring in the database configuration
const userdb = require("../data/dbConfig");

// Create the helper functions for the user database
module.exports = {
  addUser,
  getUserBy,
  getUser,
  getUserById
};

function addUser({
  email,
  first_name,
  last_name,
  password,
  is_admin,
  is_Landlord,
  is_agent,
  username
}) {
  // This is the SQL equivalent of INSERT INTO users(columns) VALUES(data to be added)
  return userdb("users").insert({
    email,
    first_name,
    last_name,
    password,
    is_admin,
    is_Landlord,
    is_agent,
    username
  }).then(ids=>{

  });
}

function getUserBy(username) {
  return userdb("users").where({ username }).first();
}

function getUserById(id) {
    return userdb("users").where({ id }).first();
  }

function getUser() {
  return userdb("users");
}

// const userdb = require("../data/dbConfig");

// module.exports = {
//   getUser,
//   addUser,
//   getUserBy,
//   getUserById,
//   deleteUser,
// };

// function getUser() {
//   const query = userdb("users").select("id", "username");
//   return query;
// }

// async function addUser(user) {
//   const [id] = await userdb("users").insert(user, "id");

//   return getUserById(id);
// }

// function getUserById(id) {
//   return userdb("users").where({ id }).first();
// }

// function getUserBy(filter) {
//   return userdb("users").where(filter);
// }

// function deleteUser(id) {
//   return userdb("users").where({ id }).del();
// }
