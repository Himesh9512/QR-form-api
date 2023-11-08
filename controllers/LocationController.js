const asyncHandler = require("express-async-handler");
const District = require("../models/District");
const Taluka = require("../models/Taluka");
const Branch = require("../models/Branch");
const bcrypt = require("bcryptjs");

const { generate_branchId, generate_password } = require("../utils");

// configure Courier Client
const { CourierClient } = require("@trycourier/courier");
const dotenv = require("dotenv");
dotenv.config();
const token = process.env.COURIER_ACCESS_TOKEN;
const courier = CourierClient({ authorizationToken: token });

exports.branch_create_post = [
	asyncHandler(async (req, res, next) => {
		const branchId = generate_branchId(req.body.branchName);
		const password = generate_password();

		req.body.branchId = branchId;
		req.body.password = password;

		next();
	}),
	asyncHandler(async (req, res, next) => {
		const password = req.body.password;

		bcrypt.hash(password, 10, (err, hashPassword) => {
			if (err) {
				next(err);
			} else {
				req.body.hashPassword = hashPassword;
				next();
			}
		});
	}),
	asyncHandler(async (req, res, next) => {
		const { branchName, branchId, password, hashPassword, email, taluka } = req.body;

		const branch = new Branch({
			name: branchName,
			branchId: branchId,
			password: hashPassword,
			email: email,
			taluka: taluka,
		});

		const { requestId } = await courier.send({
			message: {
				data: {
					branchId: branchId,
					password: password,
				},
				to: {
					email: email,
				},
				content: {
					title: "Gujarat Police",
					body: "branchId: {{branchId}}, password: {{password}}",
				},
				routing: {
					method: "single",
					channels: ["email"],
				},
			},
		});

		console.log("Email send with request ID: ", requestId);

		branch.save();
		res.status(200).json(branch);
	}),
];

exports.location_list_get = asyncHandler(async (req, res, next) => {
	const [district, taluka, branch] = await Promise.all([
		District.find().exec(),
		Taluka.find().exec(),
		Branch.find({}, "-password -email -branchId").exec(),
	]);

	res.status(200).json({ district, taluka, branch });
});

exports.branch_change_password_post = [
	asyncHandler(async (req, res, next) => {
		const { branchId, password } = req.body;
		const user = await Branch.findOne({ branchId: branchId });

		if (!user) {
			return res.status(401).json({ msg: "Invalid BranchId" });
		}
		const match = bcrypt.compare(password, user.password);
		if (!match) {
			return res.status(401).json({ msg: "Invalid Password" });
		}
		next();
	}),
	asyncHandler(async (req, res, next) => {
		const password = req.body.newPassword;

		console.log(password);
		bcrypt.hash(password, 10, (err, hashPassword) => {
			if (err) {
				next(err);
			} else {
				req.body.newPassword = hashPassword;
				next();
			}
		});
	}),
	asyncHandler(async (req, res, next) => {
		await Branch.findOneAndUpdate(
			{ branchId: req.body.branchId },
			{ password: req.body.newPassword },
		)
			.then((result) => res.status(200).json(result))
			.catch((err) => res.status(500).json(err));
	}),
];
