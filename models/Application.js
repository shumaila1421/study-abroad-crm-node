const mongoose = require("mongoose");
const applicationSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },

    program: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Program",
      required: true,
    },

    country: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Country",
      required: true,
    },

    status: {
      type: String,
      enum: [
        "submitted",
        "under-review",
        "conditional-offer",
        "final-offer",
        "rejected",
        "withdrawn",
      ],
      default: "submitted",
    },

    documents: [
      {
        name: { type: String },
        isSubmitted: { type: Boolean, default: false },
      },
    ],

    timeline: [
      {
        status: { type: String },
        date: { type: Date, default: Date.now },
        note: { type: String },
      },
    ],

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
    timestamps: true,
  },
);
const Application = mongoose.model("Application", applicationSchema);

module.exports = Application;
