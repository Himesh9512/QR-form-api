const Feedback = require("../models/Feedback");
const asyncHandler = require("express-async-handler");

// configure Courier Client
const { CourierClient } = require("@trycourier/courier");
const dotenv = require("dotenv");
dotenv.config();
const token = process.env.COURIER_ACCESS_TOKEN;
const courier = CourierClient({ authorizationToken: token });

exports.feedback_create_post = asyncHandler(async (req, res, next) => {
	const { feedbackType, branch, district, taluka, subject, description, fullname, email, phone } =
		req.body;

	const feedback = await Feedback({
		timestamp: new Date(),
		FeedbackType: feedbackType,
		branch: branch,
		district: district,
		taluka: taluka,
		subject: subject,
		description: description,
		isReviewed: false,
		fullname: fullname,
		email: email,
		phoneNumber: phone,
	});

	await feedback.save();
	res.json(feedback);
});

exports.feedback_list_get = asyncHandler(async (req, res, next) => {
	await Feedback.find({})
		.then((result) => {
			res.status(200).json({ feedback: result });
		})
		.catch((err) => {
			res.status(500).json(err);
		});
});

exports.feedback_update_put = asyncHandler(async (req, res, next) => {
	const result = await Feedback.findByIdAndUpdate(req.params.id, { isReviewed: true });

	if (result) {
		const { requestId } = await courier.send({
			message: {
				to: {
					data: {
						fullname: result.fullname,
					},
					email: result.email,
				},
				content: {
					title: "Gujarat Police",
					body: "Dear {{fullname}} Thank you for providing your valuable feedback. We want to inform you that your feedback has been successfully examined. We appreciate the time and effort you took to share your thoughts with Our team has carefully reviewed your feedback, and it will be considered as we work to improve our services. Your input is essential in helping us make the necessary enhancements to better meet your needs and expectations.If you have any further feedback or questions, please don't hesitate to reach out to us. We value your input and are committed to providing you with the best possible experience.Thank you for being a part of our community, and we look forward to serving you better in the future.Best regards,Gujarat PoliceCustomer Support Team",
				},
				routing: {
					method: "single",
					channels: ["email"],
				},
			},
		});

		res.status(200).json({ feedback: result, emailRequestId: requestId });
	} else {
		res.status(500).json(err);
	}
});
