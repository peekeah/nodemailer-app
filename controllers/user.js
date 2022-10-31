const users = require("../schemas/userSchama");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
    try {
        // Hashing Password
        const salt = await bcrypt.genSalt(7);
        req.body.password = await bcrypt.hash(req.body.password, salt);

        // Saving data into db
        const response = await new users(req.body).save();
        res.send(response);
    } catch (err) {
        console.log(err);
        res.status(403).send({ msg: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        // user validation in db
        const existUser = await users.findOne({ email: req.body.email });
        if(!existUser) return res.status(403).send({ msg: "User does not exist" });

        // validating password
        const isMatch = await bcrypt.compare(req.body.password, existUser.password);
        if(!isMatch) return res.status(403).send({ msg: "Incorrect Password" });

        // generating token
        const token = await jwt.sign({ ...existUser }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRY || "1h",
        });

        res.send(token);
    } catch (err) {
        console.log(err);
        res.status(403).send({ msg: err.message });
    }
};

exports.forgetPassword = async (req, res) => {
    try {
        // user validation in db
        const existUser = await users.findOne({ email: req.body.email });
        if(!existUser) return res.status(403).send({ msg: "User does not exist" });

        // hashing password
        const salt = await bcrypt.genSalt(7);
        const password = await bcrypt.hash(req.body.newPassword, salt);

        // updaing password
        existUser.password = password;
        existUser.save();

        res.send(existUser);
    } catch (err) {
        console.log(err);
        res.status(403).send({ msg: err.message });
    }
};

exports.sendMail = async (req, res) => {
    try {
        console.log(req.body)
        res.send(req.body);
    } catch (err) {
        console.log(err);
        res.status(403).send(err)
    }
}