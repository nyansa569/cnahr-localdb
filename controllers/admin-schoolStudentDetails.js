const { ObjectId } = require('mongodb');
const { getDb } = require('../config/dbConnection'); 


// @desc create a contact
// @access public
// @route POST /api/contacts
const getAllStudentDetails = async (req, res) => {
    const db = getDb(); // Get the MongoDB database instance
    const students = await db.collection('student-details').find().toArray();
    res.json(students);
  };
// @desc create a contact
// @access public
// @route POST /api/contacts
const createStudentDetails = async (req, res) => {
    const { name, email, phone, index, image, department, course } = req.body;
    if (!name || !email || !phone||!index || !image || !department||!course) {
      res.status(400).json({ error: 'All fields are mandatory' });
      return;
    }
  
   try{ 
    const db = getDb(); // Get the MongoDB database instance
    const result = await db.collection('student-details').insertOne({name, email, phone, index, image, department, course });
    res.json(result);
  }catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  


  // @desc update a contacts with an ID
// @access public
// @route PUT /api/contacts
const updatestudentDetails = async (req, res) => {
    const { id } = req.params;
    const { name, email, phone, index, image, department, course } = req.body;
    
    
    // Validate if id is a valid ObjectId
    if (!ObjectId.isValid(id)) {
      res.status(400).json({ error: 'Invalid student ID' });
      return;
    }
    try {
      const db = getDb(); // Get the MongoDB database instance
      const contact = await db.collection('student-details').findOne({ _id:new ObjectId(id) });
      const result = await db.collection('student-details').updateOne({ _id:new ObjectId(id) }, { $set: { name, email, phone, index, image, department, course } });
      if (result.matchedCount > 0) {
        res.json(result);
        console.log("Updated successfully")
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
const deleteStudentDetail = async (req, res) => {
    const { id } = req.params;
  
      // Validate if id is a valid ObjectId
      if (!ObjectId.isValid(id)) {
        res.status(400).json({ error: 'Invalid student ID' });
        return;
      }
  
   try{ 
        const db = getDb(); // Get the MongoDB database instance
        const result = await db.collection('student-details').deleteOne({ _id:new ObjectId(id) });
        if (result.deletedCount > 0) {
          res.json({ message: 'Student details deleted successfully' });
        } else {
          res.status(404).json({ message: 'Student not found' });
        }
    }catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

// @desc get a contacts with an ID
// @access public
// @route GET /api/contacts
const getStudentDetail = async (req, res) => {
    const { id } = req.params;
  
    if (!ObjectId.isValid(id)) {
      res.status(400).json({ error: 'Invalid student ID' });
      return;
    }
   try{ 
    const db = getDb(); // Get the MongoDB database instance
    const student = await db.collection('student-details').findOne({ _id:new ObjectId(id) });
    if (student) {
      res.json(student);
    } else {
      res.status(404).json({ message: 'Student not found' });
  }
  } catch (error) {
      res.status(500).json({ error:error.message });
    }
  };

  module.exports = {getAllStudentDetails, getStudentDetail, createStudentDetails, updatestudentDetails, deleteStudentDetail}