const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');


const app = express();
app.use(express.json());
app.use(cors());

dotenv.config();


const URL = process.env.MONGO_URL;
const PORT = 5001;

mongoose.connect(URL, () => {
    app.listen(PORT, () => {
        console.log(`Server started at ${PORT}`);
    });
})