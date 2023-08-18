const { ObjectId } = require('mongodb');
const { getDb } = require("../config/dbConnection");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv").config();
// @desc get all users 
// @route GET /api/users
// @access public
const getAllStudents = async (req, res) => {
    const db = getDb(); // Get the MongoDB database instance
    const student = await db.collection('students').find().toArray();
    res.json(student);
  };



// @desc register a user
// @access public
// @route /api/users/register
const registerStudent =  async (req, res) => {

    const {studentName, index, password } = req.body;
    const db = getDb();
    if (!studentName||!index|| !password) {
      res.status(400).json({ error: 'All fields are mandatory' });
      return;
    }
  
    // Check if the email already exists
    const existingUser = await db.collection('students').findOne({ index });
    if (existingUser) {
      res.status(400).json({ error: 'Index already registered' });
      return;
    }
  
    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);
  
    // Create the new user object
    const newUser = {
        studentName,
      index,
      password: hashedPassword,
    };
  
    try {
      // Insert the new user into the database
      const result = await db.collection('students').insertOne(newUser);
  
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


// @desc get a contacts with an ID
// @access public
// @route GET /api/contacts
const getStudent = async (req, res) => {
    const { id } = req.params;
  
    if (!ObjectId.isValid(id)) {
      res.status(400).json({ error: 'Invalid student ID' });
      return;
    }
   try{ 
    const db = getDb(); // Get the MongoDB database instance
    const booking = await db.collection('students').findOne({ _id:new ObjectId(id) });
    if (booking) {
      res.json(booking);
    } else {
      res.status(404).json({ message: 'Student not found' });
    }
  
  } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

// @desc delete a contacts with an ID
// @access public
// @route DELETE /api/contacts
const deleteStudent = async (req, res) => {
    const { id } = req.params;
  
      // Validate if id is a valid ObjectId
      if (!ObjectId.isValid(id)) {
        res.status(400).json({ error: 'Invalid student ID' });
        return;
      }
  
   try{ 
        const db = getDb(); // Get the MongoDB database instance
        const result = await db.collection('students').deleteOne({ _id:new ObjectId(id) });
        if (result.deletedCount > 0) {
          res.json({ message: 'Student deleted successfully' });
        } else {
          res.status(404).json({ message: 'Student not found' });
        }
    }catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  // @desc user current info
// @access public
// @route /api/users/current
const currentStudent = async (req, res) => {
    res.json(req.user.id);
  };
  
//! Update student password
  

  module.exports = {getAllStudents, registerStudent, deleteStudent, currentStudent, getStudent}