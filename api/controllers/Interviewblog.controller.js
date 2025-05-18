// interviewController.js
import Interview from "../models/interviewblog.model.js"; // Assuming you have an Interview model
import User from "../models/user.model.js"; // Assuming you have a User model

// POST /interviews/create - Create an interview entry
export const createInterview = async (req, res) => {
  try {
    

   const { title, companyId, roleId, experience, difficultyLevel, tags, interviewDate, userId } = req.body;


    if (!userId) {
      return res.status(400).json({ message: "User ID is missing in the request." });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "User not found in DB." });
    }

    const newInterview = new Interview({
  title,
  companyId,
  roleId,
  interviewDate: new Date(req.body.interviewDate),
  experience,
  difficultyLevel,
  tags,
  author: userId, // ✅ Use 'author' instead of 'user'
});


    const savedInterview = await newInterview.save();

    return res.status(201).json({
      message: "Interview created successfully",
      interview: savedInterview,
    });
  } catch (error) {
    console.error("Error in createInterview:", error); // ✅ Log full error
    return res.status(500).json({ message: error.message }); // Return the message for easier debugging
  }
};



 export const showAllInterview = async (req, res) => {
  try {
    const interviews = await Interview.find().populate("author", "name email"); // only populate what is valid
    res.status(200).json(interviews);
  } catch (error) {
    console.error("Error fetching interviews:", error.message);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

export const getInterviewById = async (req, res) => {
  try {
    const interview = await Interview.findById(req.params.id).populate("author", "name email");

    if (!interview) {
      return res.status(404).json({ message: "Interview not found" });
    }

    res.json(interview);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// controllers/interviewController.js
export const deleteInterview = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Interview.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Not found" });
    res.status(200).json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
