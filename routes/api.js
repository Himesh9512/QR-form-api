const express = require("express");
const feedbackController = require("../controllers/FeedbackController");
const locationController = require("../controllers/LocationController");
const userController = require("../controllers/UserController");
const router = express.Router();

router.get("/", (req, res, next) => res.json({ data: "QR Form api" }));

// user interaction
router.post("/feedback", feedbackController.feedback_post);

router.get("/location", locationController.location_get);

// admin (police authority)
router.post("/login", userController.user_login);

router.post("/register", userController.user_register);

router.get("/feedback", feedbackController.feedback_get);

router.put("/feedback/:id", feedbackController.feedback_put);

module.exports = router;
