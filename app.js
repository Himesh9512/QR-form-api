const express = require("express");
const createError = require("http-errors");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const dotenv = require("dotenv");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const mongoose = require("mongoose");

dotenv.config();

const indexRouter = require("./routes/index");
const apiRouter = require("./routes/api");

const app = express();

// database configuration
mongoose.set("strictQuery", false);
mongoose.set("strictPopulate", false);
async function main() {
	const mongoDb = process.env.DB_STRING;
	await mongoose.connect(mongoDb);
}
main().catch((e) => console.log(e));

require("./passport");

app.use(session({ secret: "secretkey", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/api", apiRouter);
app.use("*", (req, res, next) => {
	res.status(404).json({ Error: "Page not Found" });
});

app.use(function (req, res, next) {
	next(createError(404));
});

app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.json({ data: "error" });
});

module.exports = app;
