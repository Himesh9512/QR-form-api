const asyncHandler = require("express-async-handler");
const District = require("../models/District");

exports.location_get = asyncHandler(async (req, res, next) => {
	await District.find()
		.populate({
			path: "talukas",
			populate: {
				path: "branches",
			},
		})
		.then((result) => {
			console.log(result);
			res.status(200).json({
				locations: result,
			});
		})
		.catch((err) => {
			console.log(err);
		});
});
