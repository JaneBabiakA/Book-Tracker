const firebase = require("firebase-admin");
const { getDownloadURL } = require('firebase-admin/storage');
const credentials = require(".\\firebase.json");

firebase.initializeApp({
  credential: firebase.credential.cert(credentials),
  storageBucket: ''
});


const bucket = firebase.storage().bucket();

const uploadFile = async (file) => {
    const newFile = bucket.file(file.originalname);
    await newFile.save(file.buffer);
    const downloadUrl = await getDownloadURL(newFile);
    return downloadUrl
};

module.exports = uploadFile;