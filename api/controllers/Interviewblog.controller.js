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
