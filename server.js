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
    companyname: {
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
});

const Work = mongoose.model("Work", workSchema);

// Routes
app.get("/api", async (req, res) => {
    res.json({message: "Welcome to this API"});
});

// GET-anrop, hämta alla sparade jobberfarenheter
app.get("/works", async(req, res) => {
    try {
        let result = await Work.find({}); // Hämta in alla jobb

        return res.json(result); // Skicka med resultatet
    } catch(error) {
        return res.status(500).json(error); // Felmeddelande om fel vid anrop
    }
});

// POST-anrop, lägg till jobberfarenhet
app.post("/works", async(req, res) => {
    try {
        let result = await Work.create(req.body);

        return res.json(result);
    } catch(error) {
        return res.status(400).json(error);
    }
});

app.listen(port, () => {
    console.log('Server is running on port: ' + port);
});