const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TalukaSchema = new Schema({
	name: { type: String, required: true },
	branches: [{ type: Schema.Types.ObjectId, ref: "Branch" }],
});

module.exports = mongoose.model("Taluka", TalukaSchema);
