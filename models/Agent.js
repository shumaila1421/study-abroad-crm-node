const mongoose = require("mongoose");

const agentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    agencyName: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
    },

    city: {
      type: String,
      required: true,
    },

    commissionRate: {
      type: Number,
      default: 10,
      min: 0,
      max: 100,
    },

    totalCommission: {
      type: Number,
      default: 0,
    },

    totalStudents: {
      type: Number,
      default: 0,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    notes: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

const Agent = mongoose.model("Agent", agentSchema);

module.exports = Agent;
