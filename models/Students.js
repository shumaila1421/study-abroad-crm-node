const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    phone: {
      type: String,
      required: true,
    },

    nationality: {
      type: String,
      required: true,
    },

    passportNumber: {
      type: String,
    },

    passportExpiry: {
      type: Date,
    },

    education: {
      type: String,
      enum: ["matric", "intermediate", "bachelor", "master"],
    },

    budget: {
      type: Number,
    },

    ieltsStatus: {
      type: String,
      enum: ["not-given", "booked", "given"],
      default: "not-given",
    },

    ieltsScore: {
      type: Number,
    },

    countryPreference: {
      type: String,
    },

    programPreference: {
      type: String,
    },

    documents: [
      {
        name: { type: String },
        url: { type: String },
        uploadedAt: { type: Date, default: Date.now },
      },
    ],

    status: {
      type: String,
      enum: [
        "inquiry",
        "counseling",
        "applied",
        "offer-received",
        "visa-approved",
        "visa-rejected",
        "enrolled",
      ],
      default: "inquiry",
    },

    assignedAgent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    notes: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
