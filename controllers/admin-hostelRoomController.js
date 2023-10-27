const { ObjectId } = require('mongodb');
const { getDb } = require('../config/dbConnection'); 


//@access PUBLIC
//@route GET api/hostel-admin/rooms/
//@desc Get a list of rooms with the given hostel name
const getRooms = async (req, res) => {
    try{
        const db = getDb(); // Get the MongoDB database instance
        const rooms = await db.collection('rooms').find().toArray();
        res.json(rooms);
    }catch(e){
      res.status(500).json({ error: e.message});
    }
  };

 // @desc create a rooom
// @access public
// @route POST /api/hostel-admin/
const createRoom = async (req, res) => {
  const { hostelName, roomName, price, roomDesc, imageurl } = req.body;
  if (!hostelName|| !roomName|| !price|| !roomDesc||!imageurl) {
    res.status(400).json({ error: 'All fields are mandatory' });
    return;
  }

 try{ 
  const db = getDb(); // Get the MongoDB database instance
  const result = await db.collection('rooms').insertOne({  hostelName, roomName, price, roomDesc ,imageurl });
  res.json(result);
}catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// @desc get a room with an ID
// @access public
// @route GET /api/hostel-admin/rooms/:id
const getRoom = async (req, res) => {
    const { id } = req.params;
  
    if (!ObjectId.isValid(id)) {
      res.status(400).json({ error: 'Invalid room ID' });
      return;
    }
   try{ 
    const db = getDb(); // Get the MongoDB database instance
    const booking = await db.collection('rooms').findOne({ _id:new ObjectId(id) });
    if (booking) {
      res.json(booking);
    } else {
      res.status(404).json({ message: 'room not found' });
    }
  
  } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

// @desc delete a room with an ID
// @access public
// @route DELETE /api/hostel-admin/rooms/:id
const deleteRoom = async (req, res) => {
    const { id } = req.params;
  
      // Validate if id is a valid ObjectId
      if (!ObjectId.isValid(id)) {
        res.status(400).json({ error: 'Invalid room ID' });
        return;
      }
  
   try{ 
    const db = getDb(); // Get the MongoDB database instance
    const result = await db.collection('rooms').deleteOne({ _id:new ObjectId(id) });
    if (result.deletedCount > 0) {
      res.json({ message: 'Room deleted successfully' });
    } else {
      res.status(404).json({ message: 'Room not found' });
    }
}catch (error) {
      res.status(500).json({ error: error.message});
    }
  };


// @desc update a contacts with an ID
// @access public
// @route PUT /api/contacts
const updateRoom = async (req, res) => {
    const { id } = req.params;
    const { hostelName, roomName, price, roomDesc } = req.body;
    
    
    // Validate if id is a valid ObjectId
    if (!ObjectId.isValid(id)) {
      res.status(400).json({ error: 'Invalid room ID' });
      return;
    }
    try {
      const db = getDb(); // Get the MongoDB database instance
      const room = await db.collection('rooms').findOne({ _id:new ObjectId(id) });
      const result = await db.collection('rooms').updateOne({ _id:new ObjectId(id) }, { $set: { hostelName, roomName, price, roomDesc } });
      if (result.matchedCount > 0) {
        res.json(result);
        console.log("Updated successfully")
      } else {
        res.status(404).json({ message: 'Room not found' });
      }
   
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  


  module.exports = {getRooms, getRoom, createRoom,deleteRoom, updateRoom };