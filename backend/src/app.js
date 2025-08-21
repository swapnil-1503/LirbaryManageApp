const express = require("express");
const cors = require("cors");

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

module.exports = app;



