const { ObjectId } = require("mongodb");
const { getDb } = require("../config/dbConnection");

//@access PUBLIC
//@route GET api/locations/getHostels/
//@desc Get a list of schools with the given city name
const getBookings = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const userId = req.user.id;

  try {
    const db = getDb(); // Get the MongoDB database instance
    const hostels = await db
      .collection("bookings")
      .find({ user_id: userId })
      .toArray();
    res.json(hostels);
  } catch (e) {
    res.status(500).json({ error: "Server error" });
  }
};

// @desc create a contact
// @access public
// @route POST /api/contacts
const createBooking = async (req, res) => {
  const { hostelName, roomName, schoolName, price, roomDesc } = req.body;
  if (!hostelName || !roomName || !schoolName || !price || !roomDesc) {
    res.status(400).json({ error: "All fields are mandatory" });
    return;
  }

  try {
    const db = getDb(); // Get the MongoDB database instance
    const result = await db.collection("bookings").insertOne({
      hostelName,
      roomName,
      schoolName,
      price,
      roomDesc,
      status: "Pending",
      user_id: req.user.id,
    });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// @desc get a contacts with an ID
// @access public
// @route GET /api/contacts
const getBooking = async (req, res) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    res.status(400).json({ error: "Invalid booking ID" });
    return;
  }
  try {
    const db = getDb(); // Get the MongoDB database instance
    const booking = await db
      .collection("bookings")
      .findOne({ _id: new ObjectId(id) });

    if (booking.user_id.toString() !== req.user.id) {
      res
        .status(403)
        .json({ message: "User does not have access to this contact" });
    } else {
      if (booking) {
        res.json(booking);
      } else {
        res.status(404).json({ message: "Booking not found" });
      }
    }
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// @desc delete a contacts with an ID
// @access public
// @route DELETE /api/contacts
const deleteBooking = async (req, res) => {
  const { id } = req.params;

  // Validate if id is a valid ObjectId
  if (!ObjectId.isValid(id)) {
    res.status(400).json({ error: "Invalid booking ID" });
    return;
  }

  try {
    const db = getDb(); // Get the MongoDB database instance
    const booking = await db
      .collection("bookings")
      .findOne({ _id: new ObjectId(id) });

      if(booking.user_id.toString() !== req.user.id){
        res.status(403).json({ message: 'User does not have permission for such operations' });
      }else{
      const result = await db.collection('bookings').deleteOne({ _id:new ObjectId(id) });
      if (result.deletedCount > 0) {
        res.json({ message: 'Booking deleted successfully' });
      } else {
        res.status(404).json({ message: 'Contact not found' });
      }}
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getBookings, getBooking, createBooking, deleteBooking };
