const visaModel = require("../models/Visa");

const createVisa = async (req, res) => {
  try {
    const newVisa = new visaModel({
      student: req.body.student,
      application: req.body.application,
      country: req.body.country,
      visaType: req.body.visaType,
      status: req.body.status,
      appliedDate: req.body.appliedDate,
      decisionDate: req.body.decisionDate,
      visaNumber: req.body.visaNumber,
      expiryDate: req.body.expiryDate,
      notes: req.body.notes,
      handledBy: req.body.handledBy,
    });
    await newVisa.save();

    res.status(201).json({
      success: true,
      message: "Visa has been created successfully",
      data: newVisa,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to create visa",
      data: error.message,
    });
  }
};

const getVisas = async (req, res) => {
  try {
    const visas = await visaModel
      .find({})
      .populate("student", "name email phone")
      .populate("application", "university program status")
      .populate("handledBy", "name email");

    res.status(200).json({
      success: true,
      message: "Visas fetched successfully",
      data: visas,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to fetch visas",
      data: error.message,
    });
  }
};

const getSingleVisa = async (req, res) => {
  try {
    const { id } = req.params;
    const visa = await visaModel
      .findById(id)
      .populate("student", "name email phone")
      .populate("application", "university program status")
      .populate("handledBy", "name email");

    if (!visa) {
      return res.status(404).json({
        success: false,
        message: "Visa not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Visa fetched successfully",
      data: visa,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to fetch visa",
      error: error.message,
    });
  }
};

const getVisasByStudent = async (req, res) => {
  try {
    const { studentId } = req.params;
    const visas = await visaModel
      .find({ student: studentId })
      .populate("student", "name email phone")
      .populate("application", "university program status")
      .populate("handledBy", "name email");

    res.status(200).json({
      success: true,
      message: "Visas fetched successfully",
      data: visas,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to fetch visas",
      error: error.message,
    });
  }
};

const updateVisa = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedVisa = await visaModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedVisa) {
      return res.status(404).json({
        success: false,
        message: "Visa not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Visa has been updated successfully",
      data: updatedVisa,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to update visa",
      error: error.message,
    });
  }
};

const deleteVisa = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedVisa = await visaModel.findByIdAndDelete(id);

    if (!deletedVisa) {
      return res.status(404).json({
        success: false,
        message: "Visa not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Visa has been deleted successfully",
      data: deletedVisa,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to delete visa",
      error: error.message,
    });
  }
};

module.exports = {
  createVisa,
  getVisas,
  getSingleVisa,
  getVisasByStudent,
  updateVisa,
  deleteVisa,
};
