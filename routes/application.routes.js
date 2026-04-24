const express = require("express");
const router = express.Router();
const {
  createApplication,
  getApplications,
  getSingleApplication,
  getApplicationsByStudent,
  updateApplication,
  deleteApplication,
} = require("../controllers/application.controller");
const { protect, adminOnly } = require("../middleware/authMiddleware");

router.post("/", protect, createApplication);
router.get("/", protect, getApplications);
router.get("/:id", protect, getSingleApplication);
router.get("/student/:studentId", protect, getApplicationsByStudent);
router.put("/:id", protect, updateApplication);
router.delete("/:id", protect, adminOnly, deleteApplication);

module.exports = router;
