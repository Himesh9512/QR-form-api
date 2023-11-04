const Feedback = require("../models/Feedback");
const District = require("../models/District");
const Taluka = require("../models/Taluka");
const Branch = require("../models/Branch");
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

exports.feedback_post = [
	body("feedbackType").trim().notEmpty().withMessage("Feedback Type is empty!").escape(),
	body("district")
		.trim()
		.notEmpty()
		.withMessage("District field is empty")
		.custom(async (value) => {
			const district = await District.findOne({ name: value });

			if (!district) {
				throw new Error("Invalid District!");
			}
		})
		.escape(),
	body("taluka")
		.trim()
		.notEmpty()
		.withMessage("Taluka field is empty")
		.custom(async (value) => {
			const taluka = await Taluka.findOne({ name: value });

			if (!taluka) {
				throw new Error("Invalid Taluka!");
			}
		})
		.escape(),
	body("branch")
		.trim()
		.notEmpty()
		.withMessage("Branch field is empty")
		.custom(async (value) => {
			const branch = await Branch.findById(value);

			if (!branch) {
				throw new Error("Invalid Branch!");
			}
		})
		.escape(),
	body("subject")
		.trim()
		.notEmpty()
		.withMessage("Subject field is empty")
		.isLength({ max: 150 })
		.withMessage("exceed Maximum length of 150")
		.escape(),
	body("description").trim().escape(),
	body("fullname")
		.trim()
		.notEmpty()
		.withMessage("Username should not be Empty!")
		.isLength({ max: 50 })
		.withMessage("exceed Maximum length of 50")
		.escape(),
	body("email")
		.trim()
		.notEmpty()
		.withMessage("email should not be Empty!")
		.isEmail()
		.withMessage("Invalid Email")
		.escape(),
	body("phone").trim().escape(),
	asyncHandler(async (req, res, next) => {
		const results = validationResult(req);
		const data = req.body;

		const feedback = Feedback({
			timestamp: Date(),
			FeedbackType: data.feedbackType,
			branch: data.branch,
			district: data.district,
			taluka: data.taluka,
			subject: data.subject,
			description: data.description,
			isReviewed: false,
			user: {
				fullname: data.fullname,
				email: data.email,
				phoneNumber: data.phone,
			},
		});

		if (!results.isEmpty()) {
			res.json({
				msg: "error while validation",
				errors: results.array(),
			});
		}

		feedback.save();
		res.json(feedback);
	}),
];
