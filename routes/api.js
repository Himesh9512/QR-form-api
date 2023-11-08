const express = require("express");
const feedbackController = require("../controllers/FeedbackController");
const locationController = require("../controllers/LocationController");
const userController = require("../controllers/UserController");
const router = express.Router();

router.get("/", (req, res, next) => res.json({ data: "QR Form api" }));

// user interaction
router.post("/feedback", feedbackController.feedback_create_post);

router.get("/location", locationController.location_list_get);

// admin (police authority)
router.post("/login", userController.user_login_post);

router.post("/register", userController.user_register_post);

router.get("/feedback", userController.jwtAuth, feedbackController.feedback_list_get);

router.put("/feedback/:id", userController.jwtAuth, feedbackController.feedback_update_put);

module.exports = router;
