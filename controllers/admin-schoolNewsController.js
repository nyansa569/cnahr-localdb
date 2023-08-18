const { ObjectId } = require('mongodb');
const { getDb } = require("../config/dbConnection"); 


//@access PUBLIC
//@route GET api/locations/getHostels/
//@desc Get a list of schools with the given city name
const getAllNews = async (req, res) => {
    const schoolName  = req.params.schoolname;
    try{
        const db = getDb(); // Get the MongoDB database instance
        const hostels = await db.collection('news').find().toArray();
        res.json(hostels);
    }catch(e){
      res.status(500).json({ error: 'Server error' });
    }
  };

 // @desc create a contact
// @access public
// @route POST /api/contacts
const createNews = async (req, res) => {
  const { schoolName, profileImg, title, desc, imageUrl } = req.body;
  if (!schoolName|| !profileImg|| !title||!desc||!imageUrl) {
    res.status(400).json({ error: 'All fields are mandatory' });
    return;
  }

 try{ 
  const db = getDb(); // Get the MongoDB database instance
  const result = await db.collection('news').insertOne({ schoolName, profileImg, title, desc, imageUrl });
  res.json(result);
}catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};


// @desc get a contacts with an ID
// @access public
// @route GET /api/contacts
const getNews = async (req, res) => {
    const { id } = req.params;
  
    if (!ObjectId.isValid(id)) {
      res.status(400).json({ error: 'Invalid news ID' });
      return;
    }
   try{ 
    const db = getDb(); // Get the MongoDB database instance
    const news = await db.collection('news').findOne({ _id:new ObjectId(id) });
    if (news) {
      res.json(news);
    } else {
      res.status(404).json({ message: 'News not found' });
    }
  
  } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  // @desc delete a contacts with an ID
// @access public
// @route DELETE /api/contacts
const deleteNews = async (req, res) => {
    const { id } = req.params;
  
      // Validate if id is a valid ObjectId
      if (!ObjectId.isValid(id)) {
        res.status(400).json({ error: 'Invalid news ID' });
        return;
      }
  
   try{ 
    const db = getDb(); // Get the MongoDB database instance
    const result = await db.collection('news').deleteOne({ _id:new ObjectId(id) });
    if (result.deletedCount > 0) {
      res.json({ message: 'News deleted successfully' });
    } else {
      res.status(404).json({ message: 'News not found' });
    }
}catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  };


  module.exports = {getAllNews, getNews, createNews, deleteNews};