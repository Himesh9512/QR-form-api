const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const options = {
	toJSON: { virtuals: true },
};

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

FeedbackSchema.virtual("date_formatted").get(function () {
	return DateTime.fromJSDate(this.date).toLocaleString(DateTime.DATE_MED);
});

module.exports = mongoose.model("Feedback", FeedbackSchema);
