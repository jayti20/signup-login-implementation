// Required libraries
const express = require("express");
const mongodb = require("mongodb");
const bodyParser = require("body-parser");
const bcryptjs = require("bcryptjs");
const events = require("events");

// Destructuring MongoClient from mongodb
const { MongoClient } = mongodb;

// Setting up the Event Emitter
const eventEmitter = new events.EventEmitter();

// Initializing Express app
const app = express();

// Middleware to parse incoming JSON requests
app.use(bodyParser.json());

// MongoDB URL
const url =
  "mongodb+srv://user_demo:hpeafEFkboZbBy2w@cluster0.2fqvbad.mongodb.net/?retryWrites=true&w=majority";

// Variables for the user database and collection
let user_db;
let user_info;

// Function for signing up users
async function signUp(req, res, user_info) {
  const emailId = req.body.emailId;
  const password = await bcryptjs.hash(req.body.password, 10);
  const checkUserExists = await user_info.find({ emailId }).toArray();

  if (checkUserExists.length != 0) {
    res.send("User already exists!!!!");
  } else {
    const addNewUser = await user_info.insertOne({
      emailId,
      password,
    });
    console.log("User data added", addNewUser);
    res.send("Registration successful!");
  }
}

// Function for logging in users
async function login(req, res, user_info) {
  const emailId = req.body.emailId;
  const checkUserExists = await user_info.find({ emailId }).toArray();
  const validPassword = await bcryptjs.compare(
    req.body.password,
    checkUserExists.length === 0 ? "" : checkUserExists[0].password
  );

  if (checkUserExists.length === 1 && validPassword) {
    res.send("User logged in successfully!");
  } else {
    res.send("The provided email or password is incorrect. Please try again.");
  }
}

// Function to connect to MongoDB and perform certain action (login/signup)
async function connectToMongo(req, res, action) {
  const client = new MongoClient(url);
  try {
    await client.connect();
    console.log("Connected successfully");
    user_db = await client.db("user_db");
    console.log("Fetched database successfully!");
    user_info = await user_db.collection("user_info");
    console.log("Fetched collection info successfully!");

    eventEmitter.emit(action, req, res, user_info);
  } catch (err) {
    console.log("The error is", err);
    throw err;
  } finally {
    console.log("Closing the connection");
  }
}

// Adding listeners for signUp and login events
eventEmitter.on("signup", signUp);
eventEmitter.on("login", login);

// Setting up the routes for SignUp and Login
app.post("/api/signup", async (req, res) => {
  await connectToMongo(req, res, "signup");
});
app.post("/api/login", async (req, res) => {
  await connectToMongo(req, res, "login");
});

// Starting the Express server
app.listen(8000, () => {
  console.log("Listening to port 8000");
});
