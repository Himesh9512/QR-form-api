const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TalukaSchema = new Schema({
	name: { type: String, required: true },
	district: { type: Schema.Types.ObjectId, ref: "District" },
});

module.exports = mongoose.model("Taluka", TalukaSchema);
