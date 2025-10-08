// Webbtjänst med MongoDB och express

const express = require('express');
const cors = require("cors");

// Init express
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Routes
app.get("/api", async (req, res) => {
    res.json({message: "Welcome to this API"});
});

app.listen(port, () => {
    console.log('Server is running on port: ' + port);
});