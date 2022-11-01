const users = require("../schemas/userSchama");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodeMailer = require("nodemailer");
const shortid = require("shortid");
const smtpTransport = require("nodemailer-smtp-transport");

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
        if (!existUser) return res.status(403).send({ msg: "User does not exist" });

        // validating password
        const isMatch = await bcrypt.compare(req.body.password, existUser.password);
        if (!isMatch) return res.status(403).send({ msg: "Incorrect Password" });

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


exports.sendMail = async (req, res) => {
    try {
        const transporter = nodeMailer.createTransport(
        smtpTransport({
            host: process.env.MAIL_HOST,
            port: 465,
            secure: true,
            auth: {
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD,
            },
            tls: {
                rejectUnauthorized: false
            }
        })
        );

        let mailOptions = {
            from: process.env.MAIL_USERNAME, // sender address
            to: req.body.receiverEmail, // list of receivers
            subject: req.body.subject || "", // Subject line
            text: req.body.text || "", // plain text body
        };

        transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(403).send(error);
        } else {
            res.send({ msg: "mail sent successfully" });
        }
        });
    } catch (err) {
        console.log(err);
        res.status(403).send(err);
    }
};


exports.forgetPassword = async (req, res) => {
    try {
        // user validation in db
        const existUser = await users.findOne({ email: req.body.email });
        if (!existUser) return res.status(403).send({ msg: "User does not exist" });

        // hashing password
        const salt = await bcrypt.genSalt(7);
        const randomPassword = shortid.generate();
        const password = await bcrypt.hash(randomPassword, salt);

        // updaing password
        existUser.password = password;
        existUser.save();

        // sending password to mail
        const transporter = nodeMailer.createTransport(
            smtpTransport({
                    host: process.env.MAIL_HOST,
                    port: 465,
                    secure: true,
                    auth: {
                    user: process.env.MAIL_USERNAME,
                    pass: process.env.MAIL_PASSWORD,
                },
            })
            );
    
            let mailOptions = {
                from: process.env.MAIL_USERNAME, // sender address
                to: existUser.email, // list of receivers
                subject: "New Password for login", // Subject line
                text: `New password for login is ${randomPassword}`, // plain text body
            };
    
            transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                res.status(403).send(error);
            } else {
                res.send({ msg: 'New password has been sent to your email' });
            }
            });

    } catch (err) {
        console.log(err);
        res.status(403).send({ msg: err.message });
    }
};