const { ObjectId } = require('mongodb');
const { getDb } = require('../config/dbConnection'); 


//@access PUBLIC
//@route GET api/hostel-admin/bookings/
//@desc Get a list of rooms with the given hostel name
const getBookings = async (req, res) => {
    try{
        const db = getDb(); // Get the MongoDB database instance
        const hostels = await db.collection('bookings').find().toArray();
        res.json(hostels);
    }catch(e){
      res.status(500).json({ error: e.message });
    }
  };

  // @desc get a contacts with an ID
// @access public
// @route GET /api/contacts
const getBooking = async (req, res) => {
    const { id } = req.params;
  
    if (!ObjectId.isValid(id)) {
      res.status(400).json({ error: 'Invalid booking ID' });
      return;
    }
   try{ 
    const db = getDb(); // Get the MongoDB database instance
    const booking = await db.collection('bookings').findOne({ _id:new ObjectId(id) });
    if (booking) {
      res.json(booking);
    } else {
      res.status(404).json({ message: 'Booking not found' });
    }
  
  } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


// @desc update a contacts with an ID
// @access public
// @route PUT /api/contacts
const acceptBooking = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    
    
    // Validate if id is a valid ObjectId
    if (!ObjectId.isValid(id)) {
      res.status(400).json({ error: 'Invalid room ID' });
      return;
    }
    try {
      const db = getDb(); // Get the MongoDB database instance
      const booking = await db.collection('bookings').findOne({ _id:new ObjectId(id) });
      const result = await db.collection('bookings').updateOne({ _id:new ObjectId(id) }, { $set: {status: 'Accepted' } });
      if (result.matchedCount > 0) {
        res.json(result);
        console.log("Updated successfully")
      } else {
        res.status(404).json({ message: 'Bookings not found' });
      }
   
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
const declineBooking = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    
    
    // Validate if id is a valid ObjectId
    if (!ObjectId.isValid(id)) {
      res.status(400).json({ error: 'Invalid room ID' });
      return;
    }
    try {
      const db = getDb(); // Get the MongoDB database instance
      const booking = await db.collection('bookings').findOne({ _id:new ObjectId(id) });
      const result = await db.collection('bookings').updateOne({ _id:new ObjectId(id) }, { $set: {status: 'Declined' } });
      if (result.matchedCount > 0) {
        res.json(result);
        console.log("Updated successfully")
      } else {
        res.status(404).json({ message: 'Bookings not found' });
      }
   
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  module.exports = {getBookings, getBooking,acceptBooking,declineBooking}