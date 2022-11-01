const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const userController = require('./controllers/user');
const auth = require('./middlewares/auth');


const app = express();
app.use(express.json());
app.use(cors());

dotenv.config();


// Endpoints
app.get('/', async(req, res) => {
    res.send({title: 'Nodemailer task'});
})

app.post('/signup', userController.signup);
app.post('/login', userController.login);
app.put('/forgetpassword', userController.forgetPassword);
app.post('/mailsend', auth.authenticateToken, userController.sendMail)


// DB connection
const URL = process.env.MONGO_URL;
const PORT = 5001;

mongoose.connect(URL, () => {
    app.listen(PORT, () => {
        console.log(`Server started at ${PORT}`);
    });
})