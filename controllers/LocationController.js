const asyncHandler = require("express-async-handler");
const District = require("../models/District");
const Taluka = require("../models/Taluka");
const Branch = require("../models/Branch");

exports.branch_create_post = asyncHandler(async (req, res, next) => {});

exports.location_list_get = asyncHandler(async (req, res, next) => {
	const [district, taluka, branch] = await Promise.all([
		District.find().exec(),
		Taluka.find().exec(),
		Branch.find().exec(),
	]);

	res.status(200).json({ district, taluka, branch });
});
