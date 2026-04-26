const mongoose = require("mongoose");

const programSchema = new mongoose.Schema(
  {
    country: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Country",
      required: true,
    },

    university: {
      type: String,
      required: true,
      trim: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      enum: [
        "bachelor",
        "master",
        "diploma",
        "short-course",
        "language-course",
      ],
      required: true,
    },

    duration: {
      type: String,
      required: true,
    },

    feeRange: {
      type: String,
    },

    intake: [
      {
        type: String,
        enum: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ],
      },
    ],

    requirements: {
      ieltsScore: { type: Number },
      educationLevel: {
        type: String,
        enum: ["matric", "intermediate", "bachelor", "master"],
      },
    },

    scholarshipAvailable: {
      type: Boolean,
      default: false,
    },

    workPermit: {
      type: Boolean,
      default: false,
    },

    status: {
      type: String,
      enum: ["active", "closed"],
      default: "active",
    },
  },
  {
    timestamps: true,
  },
);

const Program = mongoose.model("Program", programSchema);

module.exports = Program;
