const { Schema, model } = require("mongoose");

const schema = new Schema({
    name: { type: "string", required: true},
    email: { type: "string", required: true },
    password: { type: "string", required: true }
});

module.exports = model("users", schema);
