const agentModel = require("../models/Agent");

const createAgent = async (req, res) => {
  try {
    const newAgent = new agentModel({
      user: req.body.user,
      agencyName: req.body.agencyName,
      phone: req.body.phone,
      city: req.body.city,
      commissionRate: req.body.commissionRate,
      notes: req.body.notes,
    });
    await newAgent.save();

    res.status(201).json({
      success: true,
      message: "Agent has been created successfully",
      data: newAgent,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to create agent",
      data: error.message,
    });
  }
};

const getAgents = async (req, res) => {
  try {
    const agents = await agentModel.find({}).populate("user", "name email");

    res.status(200).json({
      success: true,
      message: "Agents fetched successfully",
      data: agents,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to fetch agents",
      data: error.message,
    });
  }
};

const getSingleAgent = async (req, res) => {
  try {
    const { id } = req.params;
    const agent = await agentModel.findById(id).populate("user", "name email");

    if (!agent) {
      return res.status(404).json({
        success: false,
        message: "Agent not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Agent fetched successfully",
      data: agent,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to fetch agent",
      error: error.message,
    });
  }
};

const updateAgent = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedAgent = await agentModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedAgent) {
      return res.status(404).json({
        success: false,
        message: "Agent not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Agent has been updated successfully",
      data: updatedAgent,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to update agent",
      error: error.message,
    });
  }
};

const deleteAgent = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedAgent = await agentModel.findByIdAndDelete(id);

    if (!deletedAgent) {
      return res.status(404).json({
        success: false,
        message: "Agent not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Agent has been deleted successfully",
      data: deletedAgent,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to delete agent",
      error: error.message,
    });
  }
};

module.exports = {
  createAgent,
  getAgents,
  getSingleAgent,
  updateAgent,
  deleteAgent,
};
