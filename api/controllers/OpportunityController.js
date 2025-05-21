import { handleError } from "../helpers/handleError.js";
import Opportunity from "../models/opportunityModel.js";

// Create
export const createOpportunity = async (req, res, next) => {
  try {
    const { userId, ...opportunityData } = req.body;

    if (!userId) {
      return next(handleError(400, "User ID is required."));
    }

    const opportunity = await Opportunity.create({
      ...opportunityData,
      userId,
    });

    res.status(201).json(opportunity);
  } catch (error) {
    next(handleError(500, error.message));
  }
};

// Read all
export const getOpportunities = async (req, res) => {
  try {
    const opportunities = await Opportunity.find().populate("userId", "name email");
    res.json(opportunities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// // Read one
// export const getOpportunityById = async (req, res) => {
//   try {
//     const opportunity = await Opportunity.findById(req.params.id).populate("userId", "name email");
//     if (!opportunity) return res.status(404).json({ message: "Not found" });
//     res.json(opportunity);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Update
// export const updateOpportunity = async (req, res) => {
//   try {
//     const updated = await Opportunity.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     res.json(updated);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// // Delete

export const deleteOpportunity = async (req, res) => {
  try {
    const { id } = req.params

    const deletedOpportunity = await Opportunity.findByIdAndDelete(id)

    if (!deletedOpportunity) {
      return res.status(404).json({ message: "Opportunity not found" })
    }

    res.status(200).json({ message: "Opportunity deleted successfully" })
  } catch (error) {
    console.error("Delete Error:", error)
    res.status(500).json({ message: "Server error while deleting opportunity" })
  }
}

