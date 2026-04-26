const programModel = require("../models/Program");

const createProgram = async (req, res) => {
  try {
    const newProgram = new programModel({
      country: req.body.country,
      university: req.body.university,
      name: req.body.name,
      category: req.body.category,
      duration: req.body.duration,
      feeRange: req.body.feeRange,
      intake: req.body.intake,
      requirements: req.body.requirements,
      scholarshipAvailable: req.body.scholarshipAvailable,
      workPermit: req.body.workPermit,
      status: req.body.status,
    });
    await newProgram.save();

    res.status(201).json({
      success: true,
      message: "Program has been created successfully",
      data: newProgram,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to create program",
      data: error.message,
    });
  }
};

const getPrograms = async (req, res) => {
  try {
    const filter = {};
    if (req.query.country) {
      filter.country = req.query.country;
    }
    if (req.query.category) {
      filter.category = req.query.category;
    }

    const programs = await programModel
      .find(filter)
      .populate("country", "name code");

    res.status(200).json({
      success: true,
      message: "Programs fetched successfully",
      data: programs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to fetch programs",
      data: error.message,
    });
  }
};

const getSingleProgram = async (req, res) => {
  try {
    const { id } = req.params;
    const program = await programModel
      .findById(id)
      .populate("country", "name code");

    if (!program) {
      return res.status(404).json({
        success: false,
        message: "Program not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Program fetched successfully",
      data: program,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to fetch program",
      error: error.message,
    });
  }
};

const updateProgram = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProgram = await programModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedProgram) {
      return res.status(404).json({
        success: false,
        message: "Program not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Program has been updated successfully",
      data: updatedProgram,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to update program",
      error: error.message,
    });
  }
};

const deleteProgram = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProgram = await programModel.findByIdAndDelete(id);

    if (!deletedProgram) {
      return res.status(404).json({
        success: false,
        message: "Program not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Program has been deleted successfully",
      data: deletedProgram,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to delete program",
      error: error.message,
    });
  }
};

module.exports = {
  createProgram,
  getPrograms,
  getSingleProgram,
  updateProgram,
  deleteProgram,
};
