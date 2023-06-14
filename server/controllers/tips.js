import Tip from "../models/Tip.js";
import User from "../models/User.js";

/* CREATE */
export const createTip = async (req, res) => {
  try {
    const { title, description, category, videoPath } = req.body;
    const { id } = req.params;
    const user = await User.findById(id); // Find the user by ID
    const newTip = new Tip({
      userId: user._id, // Assign the user ID to the new tip
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      title: title,
      description: description,
      userPicturePath: user.picturePath,
      videoPath: videoPath,
      category: category,
      components: [],
      likes: {},
      comments: [],
    });
    await newTip.save(); // Save the new tip to the database

    const tip = await Tip.find(); // Retrieve all tips
    res.status(201).json(tip); // Return all tips as a response
  } catch (err) {
    res.status(409).json({ message: err.message }); // Handle conflict error
  }
};

/* READ */
export const getFeedTips = async (req, res) => {
  try {
    const tip = await Tip.find(); // Retrieve all tips
    res.status(200).json(tip); // Return all tips as a response
  } catch (err) {
    res.status(404).json({ message: err.message }); // Handle not found error
  }
};

export const getUserTips = async (req, res) => {
  try {
    const { userId } = req.params;
    const tip = await Tip.find({ userId }); // Retrieve tips by user ID
    res.status(200).json(tip); // Return the user's tips as a response
  } catch (err) {
    res.status(404).json({ message: err.message }); // Handle not found error
  }
};

export const getTip = async (req, res) => {
  try {
    const { tipId } = req.params;
    const tip = await Tip.findOne({ _id: tipId }); // Find a tip by its ID
    res.status(200).json(tip); // Return the tip as a response
  } catch (err) {
    res.status(404).json({ message: err.message }); // Handle not found error
  }
};

/* UPDATE */
export const likeTip = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const tip = await Tip.findById(id); // Find the tip by ID
    const isLiked = tip.likes.get(userId);

    if (isLiked) {
      tip.likes.delete(userId); // Remove the user's like
    } else {
      tip.likes.set(userId, true); // Add the user's like
    }

    const updatedTip = await Tip.findByIdAndUpdate(
      id,
      { likes: tip.likes }, // Update the likes of the tip
      { new: true }
    );

    res.status(200).json(updatedTip); // Return the updated tip as a response
  } catch (err) {
    res.status(404).json({ message: err.message }); // Handle not found error
  }
};

export const editTip = async (req, res) => {
  try {
    const { title, description, videoPath } = req.body;
    const { id } = req.params;

    const updatedTip = await Tip.findByIdAndUpdate(
      id,
      { title, description, videoPath }, // Update the title, description, and videoPath of the tip
      { new: true }
    );

    res.status(200).json(updatedTip); // Return the updated tip as a response
  } catch (err) {
    res.status(409).json({ message: err.message }); // Handle conflict error
  }
};

/* DELETE */
export const deleteTip = async (req, res) => {
  const { tipId } = req.params;
  const { userId } = req.body;
  try {
    const tip = await Tip.findById(tipId); // Find the tip by ID
    if (!tip) {
      return res.status(409).json({ message: "Tip not found" }); // Handle not found error
    }
    await Tip.findByIdAndRemove(tipId); // Remove the tip from the database

    const allTips = await Tip.find(); // Get all tips from the database

    res.status(201).json(allTips); // Return all tips as a response
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" }); // Handle server error
  }
};
