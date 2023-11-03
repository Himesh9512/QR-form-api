const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const FeedbackSchema = new Schema({
	timestamp: { type: Date, default: Date.now },
	FeedbackType: String,
	branch: { type: Schema.Types.ObjectId, ref: "Branch" },
	district: String,
	taluka: String,
	subject: String,
	description: String,
	user: {
		fullname: String,
		phoneNumber: String,
	},
});

module.exports = mongoose.model("Feedback", FeedbackSchema);
