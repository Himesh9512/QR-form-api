const passport = require("passport");
const LocalStrategy = require("passport-local");
const session = require("express-session");
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const bcrypt = require("bcryptjs");

const dotenv = require("dotenv");
dotenv.config();

const Branch = require("./models/Branch");

passport.use(
	new LocalStrategy(
		{
			usernameField: "branchId",
		},
		async (username, password, done) => {
			try {
				const user = await Branch.findOne({ branchId: username });
				if (!user) {
					return done(null, false, { message: "Incorrect branchId" });
				}
				const match = bcrypt.compare(password, user.password);
				if (!match) {
					return done(null, false, { message: "Incorrect password" });
				}
				return done(null, user);
			} catch (e) {
				return done(err);
			}
		},
	),
);

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
	try {
		const user = await Branch.findById(id);
		done(null, user);
	} catch (err) {
		done(err);
	}
});

passport.use(
	new JWTStrategy(
		{
			jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
			secretOrKey: process.env.JWT_ACCESS_TOKEN,
		},
		async function (jwtPayload, done) {
			//find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
			return await Branch.findOne({ id: jwtPayload.sub })
				.then((user) => {
					return done(null, user);
				})
				.catch((err) => {
					return done(err);
				});
		},
	),
);
