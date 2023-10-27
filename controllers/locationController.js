const { ObjectId } = require('mongodb');
const { getDb } = require("../config/dbConnection"); 

// //@access PUBLIC
// //@route GET api/locations/getCities
// //@desc Get a list of cities
// const getCities = async (req, res) => {
//     try{
//         const db = getDb(); // Get the MongoDB database instance
//         const cities = await db.collection('cities').find().toArray();
//         res.json(cities);
//     }catch(e){
//       res.status(500).json({ error: 'Server error' });
//     }
//   };

// //@access PUBLIC
// //@route GET api/locations/getSchools/:cityname
// //@desc Get a list of schools with the given city name
// const getSchools = async (req, res) => {
//     const cityName  = req.params.cityname;
//     try{
//         const db = getDb(); // Get the MongoDB database instance
//         const schools = await db.collection('schools').find({ city: cityName }).toArray();
//         res.json(schools);
//     }catch(e){  
//         res.status(500).json({ error: 'Server error' });
//     }
// };



//@access PUBLIC
//@route GET api/locations/getHostels/:cityname
//@desc Get a list of schools with the given city name
const getHostels = async (req, res) => {
    try{
        const db = getDb(); // Get the MongoDB database instance
        const hostels = await db.collection('hostels').find().toArray();
        res.json(hostels);
    }catch(e){
      res.status(500).json({ error: 'Server error' });
    }
  };

const getHostelByName = async (req, res) => {
  // const hostelID  = req.params.id;
  //   try{
  //       const db = getDb(); // Get the MongoDB database instance
  //       const hostel = await db.collection('hostels').find({ _id: hostelID });
  //       res.json(hostel);
  //   }catch(e){
  //     res.status(500).json({ error: 'Server error' });
  //   }

  const { id } = req.params;
  
    if (!ObjectId.isValid(id)) {
      res.status(400).json({ error: 'Invalid hostel ID' });
      return;
    }
   try{ 
    const db = getDb(); // Get the MongoDB database instance
    const hostel = await db.collection('hostels').findOne({ _id:new ObjectId(id) });
    if (hostel) {
      res.json(hostel);
    } else {
      res.status(404).json({ message: 'Booking not found' });
    }
  
  } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  };

  
const getRooms = async (req, res) => {
    const hostelName  = req.params.hostelname;
    try{
        const db = getDb(); // Get the MongoDB database instance
        const rooms = await db.collection('rooms').find( { 
          hostelName: hostelName } ).toArray();
        res.json(rooms);
    }catch(e){
      res.status(500).json({ error: 'Server error' });
    }
  };
const getRoomById = async (req, res) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    res.status(400).json({ error: 'Invalid room ID' });
    return;
  }
 try{ 
  const db = getDb(); // Get the MongoDB database instance
  const room = await db.collection('rooms').findOne({ _id:new ObjectId(id) });
  if (room) {
    res.json(room);
  } else {
    res.status(404).json({ message: 'Room not found' });
  }

} catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
  };

  module.exports = {getHostels, getRooms,getHostelByName, getRoomById}