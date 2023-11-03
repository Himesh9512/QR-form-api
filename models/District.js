const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const DistrictSchema = new Schema({
	name: { type: String, required: true },
	talukas: [{ type: Schema.Types.ObjectId, ref: "Taluka" }],
});

module.exports = mongoose.model("District", DistrictSchema);
