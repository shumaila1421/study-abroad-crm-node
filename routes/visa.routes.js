const express = require("express");
const router = express.Router();
const {
  createVisa,
  getVisas,
  getSingleVisa,
  getVisasByStudent,
  updateVisa,
  deleteVisa,
} = require("../controllers/visa.controllers");
const { protect, adminOnly } = require("../middleware/authMiddleware");

router.post("/", protect, createVisa);
router.get("/", protect, getVisas);
router.get("/:id", protect, getSingleVisa);
router.get("/student/:studentId", protect, getVisasByStudent);
router.put("/:id", protect, updateVisa);
router.delete("/:id", protect, adminOnly, deleteVisa);

module.exports = router;
