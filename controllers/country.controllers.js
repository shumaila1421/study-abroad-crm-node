const countryModel = require("../models/Country");

const createCountry = async (req, res) => {
  try {
    const existingCountry = await countryModel.findOne({
      name: req.body.name,
    });
    if (existingCountry) {
      return res.status(400).json({
        success: false,
        message: "Country already exists",
      });
    }

    const newCountry = new countryModel({
      name: req.body.name,
      code: req.body.code,
      visaTypes: req.body.visaTypes,
      intakeMonths: req.body.intakeMonths,
      processingTime: req.body.processingTime,
      averageCost: req.body.averageCost,
      description: req.body.description,
    });
    await newCountry.save();

    res.status(201).json({
      success: true,
      message: "Country has been created successfully",
      data: newCountry,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to create country",
      data: error.message,
    });
  }
};

const getCountries = async (req, res) => {
  try {
    const countries = await countryModel.find({ isActive: true });

    res.status(200).json({
      success: true,
      message: "Countries fetched successfully",
      data: countries,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to fetch countries",
      data: error.message,
    });
  }
};

const getSingleCountry = async (req, res) => {
  try {
    const { id } = req.params;
    const country = await countryModel.findById(id);

    if (!country) {
      return res.status(404).json({
        success: false,
        message: "Country not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Country fetched successfully",
      data: country,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to fetch country",
      error: error.message,
    });
  }
};

const updateCountry = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCountry = await countryModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedCountry) {
      return res.status(404).json({
        success: false,
        message: "Country not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Country has been updated successfully",
      data: updatedCountry,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to update country",
      error: error.message,
    });
  }
};

const deleteCountry = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCountry = await countryModel.findByIdAndDelete(id);

    if (!deletedCountry) {
      return res.status(404).json({
        success: false,
        message: "Country not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Country has been deleted successfully",
      data: deletedCountry,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to delete country",
      error: error.message,
    });
  }
};

module.exports = {
  createCountry,
  getCountries,
  getSingleCountry,
  updateCountry,
  deleteCountry,
};
