const mongoose = require("mongoose");

const visaSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },

    application: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Application",
      required: true,
    },

    country: {
      type: String,
      required: true,
    },

    visaType: {
      type: String,
      enum: ["student", "tourist", "work"],
      default: "student",
    },

    status: {
      type: String,
      enum: [
        "not-started",
        "documents-collecting",
        "applied",
        "under-review",
        "approved",
        "rejected",
      ],
      default: "not-started",
    },

    appliedDate: {
      type: Date,
    },

    decisionDate: {
      type: Date,
    },

    visaNumber: {
      type: String,
    },

    expiryDate: {
      type: Date,
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
    timestamps: true,
  },
);

const Visa = mongoose.model("Visa", visaSchema);

module.exports = Visa;
