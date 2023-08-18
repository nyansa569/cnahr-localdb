const dotenv = require("dotenv").config();
const express = require('express');
const app = express();
const { connectToDatabase } = require("./config/dbConnection");
const port = process.env.PORT || 1000;


app.use(express.json());
connectToDatabase();

app.use("/api/location", require("./routes/locationsRoute"));
app.use("/api/booking", require("./routes/bookingRoute"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/users", require("./routes/admin-hostelRoomRoutes"));
app.use("/api/hostel-admin/rooms", require("./routes/admin-hostelRoomRoutes"));
app.use("/api/hostel-admin/bookings", require("./routes/admin-hostelBookingRoutes"));
app.use("/api/hostel-admin/auth", require("./routes/admin-hostelUserRoutes"));
app.use("/api/school-admin/news", require("./routes/admin-schoolNewsRoutes"));
app.use("/api/school-admin/locations", require("./routes/admin-schoolLocationRoutes"));
app.use("/api/school-admin/student-registration", require("./routes/admin-schoolStudentRegistrationRoutes"));

app.listen(port, ()=>{
    console.log('listening on port', port);
});