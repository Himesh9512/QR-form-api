const express = require("express");
const feedbackController = require("../controllers/FeedbackController");
const locationController = require("../controllers/LocationController");
const router = express.Router();

router.get("/", (req, res, next) => res.json({ data: "QR Form api" }));

// user interaction
router.post("/feedback", feedbackController.feedback_post);

router.get("/location", locationController.location_get);

// admin (police authority)
router.post("/login");

router.post("/register");

router.get("/feedback");

router.put("/feedback");

module.exports = router;
