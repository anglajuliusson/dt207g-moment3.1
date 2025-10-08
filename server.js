// Webbtjänst med MongoDB och express

const express = require('express');
const cors = require("cors");
const mongoose = require("mongoose"); // Inkludera mongoose

// Init express
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect("").then(() => {
    console.log("Connected to MongoDB");
}).catch((error) => {
    console.log("Error connecting to database: " + error)
})

// Routes
app.get("/api", async (req, res) => {
    res.json({message: "Welcome to this API"});
});

app.listen(port, () => {
    console.log('Server is running on port: ' + port);
});