const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
	userId: { type: String, required: true },
	password: { type: String, required: true },
	branch: { type: String, required: true },
});

module.exports = mongoose.model("User", UserSchema);
