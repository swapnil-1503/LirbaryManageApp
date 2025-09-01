const express = require("express");
const cors = require("cors");
require("./utils/reminderScheduler"); 
const app = express();

// Allow requests from all origins (or restrict to your frontend)
app.use(cors({
  origin: "http://localhost:5173", // frontend origin
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json()); // to parse JSON

// Your routes
const bookRoutes = require("./routes/bookRoutes");
app.use("/api/books", bookRoutes);

const studentRoutes = require("./routes/studentRoutes");
app.use("/api/students", studentRoutes);

const adminRoutes = require("./routes/adminRoutes");
app.use("/api/admin", adminRoutes);


module.exports = app;



