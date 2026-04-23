const studentModel = require("../models/Students");

const createStudent = async (req, res) => {
  try {
    const newStudent = new studentModel({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      nationality: req.body.nationality,
      passportNumber: req.body.passportNumber,
      passportExpiry: req.body.passportExpiry,
      education: req.body.education,
      assignedAgent: req.body.assignedAgent,
      notes: req.body.notes,
    });
    await newStudent.save();

    res.status(201).json({
      success: true,
      message: "Student has been created successfully",
      data: newStudent,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to create student",
      data: error.message,
    });
  }
};

const getStudents = async (req, res) => {
  try {
    const students = await studentModel
      .find({})
      .populate("assignedAgent", "name email");

    res.status(200).json({
      success: true,
      message: "Students fetched successfully",
      data: students,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to fetch students",
      data: error.message,
    });
  }
};

const getSingleStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await studentModel
      .findById(id)
      .populate("assignedAgent", "name email");

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Student fetched successfully",
      data: student,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to fetch student",
      error: error.message,
    });
  }
};

const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedStudent = await studentModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedStudent) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Student has been updated successfully",
      data: updatedStudent,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to update student",
      error: error.message,
    });
  }
};

const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedStudent = await studentModel.findByIdAndDelete(id);

    if (!deletedStudent) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Student has been deleted successfully",
      data: deletedStudent,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to delete student",
      error: error.message,
    });
  }
};

module.exports = {
  createStudent,
  getStudents,
  getSingleStudent,
  updateStudent,
  deleteStudent,
};
