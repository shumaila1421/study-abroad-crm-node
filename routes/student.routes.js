const express = require("express");
const router = express.Router();
const {
  createStudent,
  getStudents,
  getSingleStudent,
  updateStudent,
  deleteStudent,
} = require("../controllers/student.controller");

const { protect, adminOnly } = require("../middleware/authMiddleware");

router.post("/", protect, adminOnly, createStudent);
router.get("/", protect, getStudents);
router.get("/:id", protect, getSingleStudent);
router.put("/:id", protect, adminOnly, updateStudent);
router.delete("/:id", protect, adminOnly, deleteStudent);

module.exports = router;
