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
        if (!existUser) res.status(403).send({ msg: "User not found" });

        // validating password
        const isMatch = await bcrypt.compare(req.body.password, existUser.password);
        if (!isMatch) res.status(403).send({ msg: "Incorrect Password" });

        // generating token
        const token = await jwt.sign({ ...req.body }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRY || "1h",
        });

        res.send(token);
        
    } catch(err) {
        console.log(err);
        res.status(403).send({ msg: err.message });
    }
};
