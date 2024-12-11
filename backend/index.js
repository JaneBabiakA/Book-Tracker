const express = require('express');
const mongoose = require('mongoose');

const app = express();

const url = *insert your url here*;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));
const cors = require('cors');

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended:false}));

const bookRoutes = require('./routes/bookRoutes.js');
app.use('/api', bookRoutes);

app.listen(8080, () => {
      console.log('server listening on port 8080')
})
