const express = require('express');
const cors = require('cors');
const { connectToDb, getDb, ObjectId } = require('./db');
const path = require('path');
require('dotenv').config();

// Use environment variables
const PORT = process.env.PORT || 3001;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://beruldsenbjarne:125Erten125Erten@cluster0.0ldtf.mongodb.net/babyDb?retryWrites=true&w=majority&appName=Cluster0";

// init app middleware  
const app = express();
app.use(cors());
app.use(express.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../frontend/build')));

// db connection 
let db;

connectToDb(MONGODB_URI, (err) => {
    if (!err) {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
        db = getDb();
    } else {
        console.error('Failed to connect to the database:', err);
    }
});

// API routes 
app.get('/babyer/:id', async (req, res) => {
    const babyId = req.params.id;
    console.log(`Fetching data for baby ID: ${babyId}`);
    try {
        const start = Date.now();
        const item = await db.collection('babyer').findOne({ _id: new ObjectId(babyId) });
        const duration = Date.now() - start;
        console.log(`Database query took ${duration}ms`);

        if (!item) {
            console.log('No data found for baby ID:', babyId);
            return res.status(404).send('No data found');
        }

        console.log('Baby data fetched successfully:', item);
        res.status(200).json(item);
    } catch (err) {
        console.error('Error fetching baby data:', err);
        res.status(500).send(err);
    }
});

// Add a new route to handle POST requests to /mat
app.post('/mat', async (req, res) => {
    const { idag, typeMat, mengdeSpist, klSlett } = req.body;
    console.log('Logging new mat:', req.body);

    try {
        const result = await db.collection('babyer').updateOne(
            { _id: new ObjectId("6787679af8e19d69b8b1bac3") }, // Replace with actual baby ID
            { $push: { mat: { idag, typeMat, mengdeSpist, klSlett } } }
        );

        if (result.modifiedCount === 0) {
            return res.status(404).send('Baby not found');
        }

        console.log('Mat logged successfully');
        res.status(200).send('Mat logged successfully');
    } catch (err) {
        console.error('Error logging mat:', err);
        res.status(500).send(err);
    }
});

// Add a new route to handle POST requests to /sovn
app.post('/sovn', async (req, res) => {
    const { dato, leggerSeg, våkner, antVåken, antallTimer } = req.body;
    console.log('Logging new sovn:', req.body);

    try {
        const result = await db.collection('babyer').updateOne(
            { _id: new ObjectId("6787679af8e19d69b8b1bac3") }, // Replace with actual baby ID
            { $push: { sovn: { dato, leggerSeg, våkner, antVåken, antallTimer } } }
        );

        if (result.modifiedCount === 0) {
            return res.status(404).send('Baby not found');
        }

        console.log('Sovn logged successfully');
        res.status(200).send('Sovn logged successfully');
    } catch (err) {
        console.error('Error logging sovn:', err);
        res.status(500).send(err);
    }
});

// Add a new route to handle POST requests to /do
app.post('/do', async (req, res) => {
    const { dato, klSlett, konsistens, mengde } = req.body;
    console.log('Logging new do:', req.body);

    try {
        const result = await db.collection('babyer').updateOne(
            { _id: new ObjectId("6787679af8e19d69b8b1bac3") }, // Replace with actual baby ID
            { $push: { do: { dato, klSlett, konsistens, mengde } } }
        );

        if (result.modifiedCount === 0) {
            return res.status(404).send('Baby not found');
        }

        console.log('Do logged successfully');
        res.status(200).send('Do logged successfully');
    } catch (err) {
        console.error('Error logging do:', err);
        res.status(500).send(err);
    }
});

// All other GET requests not handled before will return the React app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});