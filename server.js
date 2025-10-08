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
mongoose.connect("mongodb://localhost:27017/work_experiences").then(() => {
    console.log("Connected to MongoDB");
}).catch((error) => {
    console.log("Error connecting to database: " + error)
})

// Work Schema
const workSchema = new mongoose.Schema ({
    companyName: {
        type: String,
        required: true
    },
    jobtitle: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    startdate: {
        type: Date,
        required: true
    },
    enddate: {
        type: Date,
        required: false // Slutdatum behövs inte om det är ett pågående jobb
    }
})

// Routes
app.get("/api", async (req, res) => {
    res.json({message: "Welcome to this API"});
});

app.listen(port, () => {
    console.log('Server is running on port: ' + port);
});