const express = require("express");
const router = express.Router();
const {
  createAgent,
  getAgents,
  getSingleAgent,
  updateAgent,
  deleteAgent,
} = require("../controllers/agent.controller");
const { protect, adminOnly } = require("../middleware/authMiddleware");

router.post("/", protect, adminOnly, createAgent);
router.get("/", protect, getAgents);
router.get("/:id", protect, getSingleAgent);
router.put("/:id", protect, adminOnly, updateAgent);
router.delete("/:id", protect, adminOnly, deleteAgent);

module.exports = router;
