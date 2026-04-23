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

    status: {
      type: String,
      enum: [
        "new",
        "in-progress",
        "visa-approved",
        "visa-rejected",
        "enrolled",
      ],
      default: "new",
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
