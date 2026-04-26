const mongoose = require("mongoose");

const countrySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },

    code: {
      type: String,
      required: true,
      uppercase: true,
    },

    visaTypes: [
      {
        type: String,
      },
    ],

    intakeMonths: [
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

    processingTime: {
      type: String,
    },

    averageCost: {
      type: String,
    },

    description: {
      type: String,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

const Country = mongoose.model("Country", countrySchema);

module.exports = Country;
