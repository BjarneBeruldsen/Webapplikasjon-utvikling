const { MongoClient, ObjectId } = require('mongodb');

let db;

const connectToDb = (connectionString, callback) => {
    MongoClient.connect(connectionString)
        .then((client) => {
            db = client.db();
            callback();
        })
        .catch((err) => {
            callback(err);
        });
};

const getDb = () => db;

module.exports = { connectToDb, getDb, ObjectId };

// Dummy comment to force redeploy