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
    const schoolName  = req.params.schoolname;
    try{
        const db = getDb(); // Get the MongoDB database instance
        const hostels = await db.collection('hostels').find({school: schoolName}).toArray();
        res.json(hostels);
    }catch(e){
      res.status(500).json({ error: 'Server error' });
    }
  };

  
const getRooms = async (req, res) => {
    const hostelName  = req.params.hostelname;
    try{
        const db = getDb(); // Get the MongoDB database instance
        const rooms = await db.collection('rooms').find( { hostel: hostelName } ).toArray();
        res.json(rooms);
    }catch(e){
      res.status(500).json({ error: 'Server error' });
    }
  };

  module.exports = {getHostels, getRooms,}