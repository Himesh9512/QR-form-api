const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BranchSchema = new Schema({
	name: { type: String, required: true },
});

module.exports = mongoose.model("Branch", BranchSchema);
