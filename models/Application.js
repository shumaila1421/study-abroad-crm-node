const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    university: {
      type: String,
      required: true,
    },
    program: {
      type: String,
      required: true,
    },
    intake: {
      type: String,
      enum: ["spring", "summer", "fall", "winter"],
      required: true,
    },
    intakeYear: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: [
        "pending",
        "submitted",
        "under-review",
        "accepted",
        "rejected",
        "deferred",
      ],
      default: "pending",
    },
    appliedDate: {
      type: Date,
      default: Date.now,
    },
    notes: {
      type: String,
    },
    handledBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: false,
  },
);

const Application = mongoose.model("Application", applicationSchema);

module.exports = Application;
