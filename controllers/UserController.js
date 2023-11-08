const asyncHandler = require("express-async-handler");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const dotenv = require("dotenv");
dotenv.config();

exports.jwtAuth = passport.authenticate("jwt", { session: false });

exports.user_login_post = (req, res, next) => {
	passport.authenticate("local", (err, user, info) => {
		if (err || !user) {
			return res.status(400).json({
				message: "Something is wrong",
				user: user,
			});
		}
		req.login(user, (err) => {
			if (err) {
				res.send(err);
			}

			const token = jwt.sign(user.toJSON(), process.env.JWT_ACCESS_TOKEN);
			return res.json({ user, token });
		});
	})(req, res);
};

exports.user_register_post = [
	asyncHandler(async (req, res, next) => {
		const password = req.body.password;

		bcrypt.hash(password, 10, (err, hashPassword) => {
			if (err) {
				next(err);
			} else {
				req.body.password = hashPassword;
				next();
			}
		});
	}),
	asyncHandler(async (req, res, next) => {
		const user = User({
			username: req.body.username,
			password: req.body.password,
			branch: req.body.branch,
		});

		user.save();
		res.json(user);
	}),
];
