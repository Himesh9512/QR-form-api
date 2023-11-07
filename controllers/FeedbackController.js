const Feedback = require("../models/Feedback");
const District = require("../models/District");
const Taluka = require("../models/Taluka");
const Branch = require("../models/Branch");
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

const emailSender = (username, email) => {
	const { spawn } = require("child_process");

	// Replace 'your_python_script.py' with the actual filename of your Python script.
	const pythonScript = "sender.py";

	// The data you want to pass from JavaScript to Python.
	const dataToPass = `${username} , ${email}`;

	// Run the Python script and send the data through standard input
	const pythonProcess = spawn("python", [pythonScript]);

	pythonProcess.stdin.write(dataToPass);
	pythonProcess.stdin.end();

	pythonProcess.stdout.on("data", (data) => {
		console.log(`Python Script Output: ${data}`);
	});

	pythonProcess.stderr.on("data", (data) => {
		console.error(`Python Script Error: ${data}`);
	});
};

exports.feedback_post = asyncHandler(async (req, res, next) => {
	const data = req.body;

	const feedback = await Feedback({
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

	await feedback.save();
	res.json(feedback);
});

exports.feedback_get = asyncHandler(async (req, res, next) => {
	await Feedback.find({})
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
			emailSender(result.fullname, result.email);
			res.status(200).json(result);
		})
		.catch((err) => {
			res.status(500).json(err);
		});
});
