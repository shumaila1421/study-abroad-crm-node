const applicationModel = require("../models/Application");

const createApplication = async (req, res) => {
  try {
    const newApplication = new applicationModel({
      student: req.body.student,
      program: req.body.program,
      country: req.body.country,
      status: req.body.status,
      documents: req.body.documents,
      notes: req.body.notes,
      handledBy: req.body.handledBy,
    });
    await newApplication.save();

    res.status(201).json({
      success: true,
      message: "Application has been created successfully",
      data: newApplication,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to create application",
      data: error.message,
    });
  }
};

const getApplications = async (req, res) => {
  try {
    const applications = await applicationModel
      .find({})
      .populate("student", "name email phone")
      .populate("program", "name university category")
      .populate("country", "name code")
      .populate("handledBy", "name email");

    res.status(200).json({
      success: true,
      message: "Applications fetched successfully",
      data: applications,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to fetch applications",
      data: error.message,
    });
  }
};

const getSingleApplication = async (req, res) => {
  try {
    const { id } = req.params;
    const application = await applicationModel
      .findById(id)
      .populate("student", "name email phone")
      .populate("program", "name university category")
      .populate("country", "name code")
      .populate("handledBy", "name email");

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Application fetched successfully",
      data: application,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to fetch application",
      error: error.message,
    });
  }
};

const getApplicationsByStudent = async (req, res) => {
  try {
    const { studentId } = req.params;
    const applications = await applicationModel
      .find({ student: studentId })
      .populate("student", "name email phone")
      .populate("handledBy", "name email");

    res.status(200).json({
      success: true,
      message: "Applications fetched successfully",
      data: applications,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to fetch applications",
      error: error.message,
    });
  }
};

const updateApplication = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedApplication = await applicationModel.findByIdAndUpdate(
      id,
      req.body,
      { new: true },
    );

    if (!updatedApplication) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Application has been updated successfully",
      data: updatedApplication,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to update application",
      error: error.message,
    });
  }
};

const deleteApplication = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedApplication = await applicationModel.findByIdAndDelete(id);

    if (!deletedApplication) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Application has been deleted successfully",
      data: deletedApplication,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to delete application",
      error: error.message,
    });
  }
};

module.exports = {
  createApplication,
  getApplications,
  getSingleApplication,
  getApplicationsByStudent,
  updateApplication,
  deleteApplication,
};
