const { ObjectId } = require('mongodb');
const { getDb } = require("../config/dbConnection"); 


//@access PUBLIC
//@route GET api/locations/getHostels/
//@desc Get a list of schools with the given city name
const getLocations = async (req, res) => {
    try{
        const db = getDb(); // Get the MongoDB database instance
        const locations = await db.collection('locations').find().toArray();
        res.json(locations);
    }catch(e){
      res.status(500).json({ error: e.message });
    }
  };

 // @desc create a contact
// @access public
// @route POST /api/contacts
const createLocation = async (req, res) => {
  const { name, description, longitude, latitude, image } = req.body;
  if (!name||!description||!longitude||!latitude||!image) {
    res.status(400).json({ error: 'All fields are mandatory' });
    return;
  }

 try{ 
  const db = getDb(); // Get the MongoDB database instance
  const result = await db.collection('locations').insertOne({  name, description, longitude, latitude, image  });
  res.json(result);
}catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// @desc get a contacts with an ID
// @access public
// @route GET /api/contacts
const getLocation = async (req, res) => {
    const { id } = req.params;
  
    if (!ObjectId.isValid(id)) {
      res.status(400).json({ error: 'Invalid location ID' });
      return;
    }
   try{ 
    const db = getDb(); // Get the MongoDB database instance
    const location = await db.collection('locations').findOne({ _id:new ObjectId(id) });
    if (location) {
      res.json(location);
    } else {
      res.status(404).json({ message: 'Booking not found' });
    }
  
  } catch (error) {
      res.status(500).json({ error:error.message });
    }
  };
// @desc update a contacts with an ID
// @access public
// @route PUT /api/contacts
const updateLocation = async (req, res) => {
    const { id } = req.params;
    const { name, description, longitude, latitude, image } = req.body;
    
    
    // Validate if id is a valid ObjectId
    if (!ObjectId.isValid(id)) {
      res.status(400).json({ error: 'Invalid location ID' });
      return;
    }
    try {
      const db = getDb(); // Get the MongoDB database instance
      const result = await db.collection('locations').updateOne({ _id:new ObjectId(id) }, { $set: { name, description, longitude, latitude, image  } });
      if (result.matchedCount > 0) {
        res.json(result);
        console.log("Location updated successfully")
      } else {
        res.status(404).json({ message: 'Location not found' });
      }
    
   
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

  // @desc delete a contacts with an ID
// @access public
// @route DELETE /api/contacts
const deleteLocation = async (req, res) => {
    const { id } = req.params;
  
      // Validate if id is a valid ObjectId
      if (!ObjectId.isValid(id)) {
        res.status(400).json({ error: 'Invalid location ID' });
        return;
      }
  
   try{ 
    const db = getDb(); // Get the MongoDB database instance
    const result = await db.collection('locations').deleteOne({ _id:new ObjectId(id) });
    if (result.deletedCount > 0) {
      res.json({ message: 'Location deleted successfully' });
    } else {
      res.status(404).json({ message: 'Location not found' });
    }
}catch (error) {
      res.status(500).json({ error: error.message});
    }
  };


  module.exports = {getLocations, getLocation, createLocation, deleteLocation, updateLocation};