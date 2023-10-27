const { ObjectId } = require('mongodb');
const { getDb } = require("../config/dbConnection");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv").config();

// @desc get all users 
// @route GET /api/users
// @access public
const getAllAdmin = async (req, res) => {
    const db = getDb(); // Get the MongoDB database instance
    const hostelAdmins = await db.collection('hostel-admin').find().toArray();
    res.json(hostelAdmins);
  };



// @desc login a user
// @access public
// @route /api/users/login
const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  const db = getDb();

  if ( !email || !password) {
    res.status(400).json({ error: 'All fields are mandatory' });
    return;
  }

  try {
    // Find the user in the database
    const user = await db.collection('hostel-admin').findOne({ email });
    if (!user) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    // Compare the provided password with the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ error: 'Invalid password' });
      return;
    }

    console.log("User id is: ",user._id.toString());
    
    // Generate a JWT token
    const accessToken = jwt.sign(
      {
        user: {
          id: user._id.toString(),
          username: user.username,
          email: user.email,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "20m" }
    );
    res.status(200).json({ accessToken, success: true });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};




// @desc register a user
// @access public
// @route /api/users/register
const registerAdmin =  async (req, res) => {

    const { email, password, firstname, lastname, hostelname } = req.body;
    const db = getDb();
    if (!email || !password||!firstname|| !lastname ||!hostelname) {
      res.status(400).json({ error: 'All fields are mandatory' });
      return;
    }
  
    // Check if the email already exists
    const existingUser = await db.collection('hostel-admin').findOne({ email });
    if (existingUser) {
      res.status(400).json({ error: 'Email already registered' });
      return;
    }
  
    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);
  
    // Create the new user object
    const newUser = {
      email,
      password: hashedPassword,
      firstname,
      lastname,
      hostelname
    };
  
    try {
      // Insert the new user into the database
      const result = await db.collection('hostel-admin').insertOne(newUser);
  
      res.json(result);
    } catch (error) {
      console.log('Error: ' + error.message)
      res.status(500).json({ error: 'Server error' });
    }
  };

// @desc user current info
// @access public
// @route /api/users/current
const currentUser = async (req, res) => {
  res.json(req.user.id);
};



module.exports ={getAllAdmin, currentUser,loginAdmin, registerAdmin};