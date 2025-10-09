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
        required: [true, "Du måste ange företagsnamn"],
    },
    jobtitle: {
        type: String,
        required: [true, "Du måste ange jobbtitel"],
    },
    location: {
        type: String,
        required: [true, "Du måste ange plats"],
    },
    startdate: {
        type: Date,
        required: [true, "Du måste ange startdatum"],
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

// PUT-anrop, uppdatera jobberfarenhet
app.put("/works/:id", async (req, res) => {
    try {
        const {id} = req.params; // Hämta ID från URL:en
        // Uppdatera dokument med nya värden
        const updatedWork = await Work.findByIdAndUpdate(id, req.body, {
            new: true, // Returnera det uppdaterade dokumentet
            runValidators: true // Kör mongoose-valideringarna
        });

        if (!updatedWork) {
            // Om inget dokument hittas med det angivna ID:t
            return res.status(404).json({ message: "Jobberfarenhet hittades inte" });
        }
        // Returnera det uppdaterade objektet
        return res.json({message: `Jobberfarenhet uppdaterad: ${id}`, updatedWork});
    } catch (error) {
        // Fel vid validering eller uppdatering
        return res.status(400).json({ error: error.message });
    }
});

// DELETE-anrop, radera jobberfarenhet
app.delete("/works/:id", async (req, res) => {
    try {
        const {id} = req.params; // Hämta ID från URL:en
        // Ta bort dokumentet
        const deletedWork = await Work.findByIdAndDelete(id);

        if (!deletedWork) {
            // Om inget dokument hittas med det angivna ID:t
            return res.status(404).json({ message: "Jobberfarenhet hittades inte" });
        }
        // Bekräftelse på att dokumentet togs bort
        return res.json({ message: `Jobberfarenhet borttagen ${id}`, deletedWork });
    } catch (error) {
        // Fel vid borttagning
        return res.status(400).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log('Server is running on port: ' + port);
});