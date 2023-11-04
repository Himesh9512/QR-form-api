const Feedback = require("../models/Feedback");
const District = require("../models/District");
const Taluka = require("../models/Taluka");
const Branch = require("../models/Branch");
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

exports.feedback_post = asyncHandler(async (req, res, next) => {
	const data = req.body;

	const feedback = Feedback({
		timestamp: new Date(),
		FeedbackType: data.feedbackType,
		branch: data.branch,
		district: data.district,
		taluka: data.taluka,
		subject: data.subject,
		description: data.description,
		isReviewed: false,
		fullname: data.fullname,
		email: data.email,
		phoneNumber: data.phone,
	});

	if (!results.isEmpty()) {
		res.json({
			msg: "error while validation",
			errors: results.array(),
		});
	}

	feedback.save();
	res.json(feedback);
});

exports.feedback_get = asyncHandler(async (req, res, next) => {
	const branch = req.user.branch;

	await Feedback.find({ branch: branch })
		.then((result) => {
			res.status(200).json({ feedback: result });
		})
		.catch((err) => {
			res.status(500).json(err);
		});
});

exports.feedback_put = asyncHandler(async (req, res, next) => {
	await Feedback.findByIdAndUpdate(req.params.id, { isReviewed: true })
		.then((result) => {
			res.status(200).json(result);
		})
		.catch((err) => {
			res.status(500).json(err);
		});
});
