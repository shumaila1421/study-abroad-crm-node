const express = require("express");
const router = express.Router();
const {
  createProgram,
  getPrograms,
  getSingleProgram,
  updateProgram,
  deleteProgram,
} = require("../controllers/program.controllers");
const { protect, adminOnly } = require("../middleware/authMiddleware");

router.post("/", protect, adminOnly, createProgram);
router.get("/", getPrograms);
router.get("/:id", getSingleProgram);
router.put("/:id", protect, adminOnly, updateProgram);
router.delete("/:id", protect, adminOnly, deleteProgram);

module.exports = router;
