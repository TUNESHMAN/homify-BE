// Bring in express
const express = require("express");
// Bring in the helper functions from userDB.js
const users = require("./userDB");
// Import the router
const router = express.Router();
// Bring in bcrypt
const bcrypt = require("bcryptjs");
// Bring in the token generation function from the token folder
const genToken = require("../auth/token");
// Bring in express router for validation
const { check, validationResult } = require("express-validator");
// Bring in nodemailer for sending emails
var nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "tuneshdev@gmail.com",
    pass: "mechanical2",
  },
  tls: { rejectUnauthorized: false },
});

// Users endpoints here 👇👇👇
// This is the register endpoint
router.post(
  "/register",
  check("email", "Email is Required").isEmail(),
  check("first_name").not().isEmpty().withMessage("First name is required"),
  check("last_name").not().isEmpty().withMessage("Last name is required"),
  check("password", "Password is required").isLength({ min: 5 }),
  check("username").not().isEmpty().withMessage("Username is required"),
  check("is_agent", "Are you an agent?").isBoolean(),
  check("is_Landlord", "Are you a Landlord?").isBoolean(),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      email,
      first_name,
      last_name,
      password,
      username,
      is_agent,
      is_Landlord,
    } = req.body;

    var mailOptions = {
      from: "tuneshdev@gmail.com",
      to: req.body.email,
      subject: "HOMIFY ACCOUNT CREATED SUCCESSFULLY",
      text: `You have successfully created an account`,
    };
    //   The password has to be hashed
    const hashedPassword = bcrypt.hashSync(password, 10);
    //   Add a new user
    const newUser = {
      email,
      first_name,
      last_name,
      password: hashedPassword,
      is_admin: false,
      username,
      is_agent,
      is_Landlord,
    };
    users
      .addUser(newUser)
      .then((member) => {
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(`JJ`, error);
          } else {
            console.log("Email sent: " + info.response);
          }
        });
        res.status(200).json({ message: `Success`, newUser });
      })
      .catch((error) => {
        res.status(500).json({ message: error.message, stack: error.stack });
      });
  }
);

// This is the login endpoint
router.post(
  "/login",
  check("username").not().isEmpty().withMessage("Username is required"),
  check("password", "Password is required").isLength({ min: 5 }),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let { username, password } = req.body;

    // We need to first fish out the user from the db
    users
      .getUserBy(username)
      .first()
      .then((member) => {
        //   Get the user from the database and compare input password to hashed password
        if (member && bcrypt.compareSync(password, member.password)) {
          //If the user exists and password is okay, a token should be generated

          const token = genToken(member);
          res.status(200).json({
            message: `Login success, ${member.username}`,
            token,
            member,
          });
        } else {
          res.status(401).json({ message: `Credentials are not valid` });
        }
      })
      .catch((error) => {
        res.status(500).json({
          message: error.message,
          stack: error.stack,
        });
      });
  }
);

// Middleware for validating user inputs
// function validateUser(req, res, next) {
//   const addedUser = req.body;
//   console.log(`BUBU`, addedUser);
//   if (Object.keys(addedUser).length === 0) {
//     res.status(400).json({ message: "Invalid inputs" });
//   } else if (!addedUser.email) {
//     res.status(400).json({ message: "Please enter a valid email" });
//   } else if (!addedUser.first_name) {
//     res.status(400).json({ message: "Please input your first name" });
//   } else if (!addedUser.username) {
//     res.status(400).json({ message: "You have not chosen a username" });
//   } else if (!addedUser.last_name) {
//     res.status(400).json({ message: "Please input your last name" });
//   } else if (!addedUser.password) {
//     res.status(400).json({ message: "You have not chosen a password" });
//   } else {
//     next();
//   }
// }

// Export the router to be seen by the server
module.exports = router;
