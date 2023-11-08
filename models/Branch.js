const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BranchSchema = new Schema({
	name: { type: String, required: true },
	branchId: { type: String, required: true },
	password: { type: String, required: true },
	email: { type: String, required: true },
	taluka: { type: Schema.Types.ObjectId, ref: "Taluka" },
});

module.exports = mongoose.model("Branch", BranchSchema);
