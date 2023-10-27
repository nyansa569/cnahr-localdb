const { ObjectId } = require("mongodb");
const { getDb } = require("../config/dbConnection");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
let time = "5h";

// @desc get all users
// @route GET /api/users
// @access public
const getAllUsers = async (req, res) => {
  const db = getDb(); // Get the MongoDB database instance
  const users = await db.collection("users").find().toArray();
  res.json(users);
};

// @desc login a user
// @access public
// @route /api/users/login
const loginUser = async (req, res) => {
  const { index, password } = req.body;
  const db = getDb();

  if (!index || !password) {
    res.status(400).json({ error: "All fields are mandatory" });
    return;
  }

  try {
    // Find the user in the database
    const user = await db.collection("users").findOne({ index });
    if (!user) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }

    // Compare the provided password with the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ error: "Invalid password" });
      return;
    }

    console.log("User id is: ", user._id.toString());

    // Generate a JWT token
    const accessToken = jwt.sign(
      {
        user: {
          id: user._id.toString(),
          index: index,
          studentName: user.studentName,
          school: user.school,
          course: user.course,
          profilePicture: user.profilePicture,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30m" }
    );
    res.status(200).json({ status: true, token: accessToken });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc register a user
// @access public
// @route /api/users/register
const registerUser = async (req, res) => {
  // const { index, password, name, school, course } = req.body;
  const { index, password, studentName, school, course , profilePicture} = req.body;
  const db = getDb();
  if (!index || !password || !studentName || !school || !course||!profilePicture) {
    res.status(400).json({ error: "All fields are mandatory" });
    return;
  }

  // Check if the email already exists
  const existingUser = await db.collection("users").findOne({ index });
  if (existingUser) {
    res.status(400).json({ status: false, error: "ID already registered" });
    return;
  }

  // Hash the password before saving it to the database
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create the new user object
  const newUser = {
    index,
    password: hashedPassword,
    studentName,
    school,
    course,
    profilePicture,
  };

  try {
    // Insert the new user into the database
    const result = await db.collection("users").insertOne(newUser);

    res.json({ status: true, result: result });
  } catch (error) {
    console.log("Error: " + error.message);
    res.status(500).json({ status: false, error: error.message });
  }
};

const logoutUser = (req, res) => {
  try {
    res.cookie("token", null, {
      expiresIn: "0.01s",
      httpOnly: true,
    });
    res.status(201).json({
      message: "Logged out successfully",
      success: true,
    });
    print(time);
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

// @desc user current info
// @access public
// @route /api/users/current
const currentUser = async (req, res) => {
  console.log('Current...')
  try {
    // Assuming you have user details available in req.user
    // Replace with the actual user ID
    const user = {
      id: req.user.id,
      index: req.user.index,
      studentName: req.user.studentName,
      school: req.user.school,
      course: req.user.course,
      profilePicture: req.user.profilePicture,
      // Include other user details here as needed
    };
    console.log(user)
    res.status(200).json(user); // Send the user details in the response body
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
};

module.exports = {
  getAllUsers,
  currentUser,
  loginUser,
  registerUser,
  logoutUser,
};
