const admin = require("firebase-admin");
const credentials = require("./firestoreKey.json");

admin.initializeApp({
    credential: admin.credential.cert(credentials)
});

const database = admin.firestore();

module.exports = database;

