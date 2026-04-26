const express = require("express");
const router = express.Router();
const {
  createCountry,
  getCountries,
  getSingleCountry,
  updateCountry,
  deleteCountry,
} = require("../controllers/country.controllers");
const { protect, adminOnly } = require("../middleware/authMiddleware");

router.post("/", protect, adminOnly, createCountry);
router.get("/", getCountries);
router.get("/:id", getSingleCountry);
router.put("/:id", protect, adminOnly, updateCountry);
router.delete("/:id", protect, adminOnly, deleteCountry);

module.exports = router;
