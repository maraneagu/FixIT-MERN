import Tip from "../models/Tip.js";
import User from "../models/User.js";

/* CREATE */
export const createTip = async (req, res) => {
  try {
    console.log("body: ", req.body);
    const { title, description, category, videoPath } = req.body;
    const { id } = req.params;
    const user = await User.findById(id);
    const newTip = new Tip({
      userId: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      title: title,
      description: description,
      userPicturePath: user.picturePath,
      // picturePath: picturePath,
      videoPath: videoPath,
      category: category,
      components: [],
      likes: {},
      comments: [],
    });
    await newTip.save();

    const tip = await Tip.find();
    res.status(201).json(tip);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

/* READ */
export const getFeedTips = async (req, res) => {
  try {
    const tip = await Tip.find();
    res.status(200).json(tip);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserTips = async (req, res) => {
  try {
    const { userId } = req.params;
    const tip = await Tip.find({ userId });
    res.status(200).json(tip);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getTip = async (req, res) => {
  try {
    const { tipId } = req.params;
    const tip = await Tip.findOne({ _id: tipId });
    res.status(200).json(tip);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
export const likeTip = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const tip = await Tip.findById(id);
    const isLiked = tip.likes.get(userId);

    if (isLiked) {
      tip.likes.delete(userId);
    } else {
      tip.likes.set(userId, true);
    }

    const updatedTip = await Tip.findByIdAndUpdate(
      id,
      { likes: tip.likes },
      { new: true }
    );

    res.status(200).json(updatedTip);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const editTip = async (req, res) => {
  try {
    const { title, description, videoPath } = req.body;
    const { id } = req.params;

    const updatedTip = await Tip.findByIdAndUpdate(
      id,
      { title, description, videoPath },
      { new: true }
    );
    
    res.status(200).json(updatedTip);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

/* DELETE */
export const deleteTip = async (req, res) => {
  const { tipId } = req.params;
  const { userId } = req.body;
  // console.log("userID :", userId);
  try {
    const tip = await Tip.findById(tipId);
    // console.log("tip : ",tip);
    // console.log("tipid :",tipId);
    if (!tip) {
      return res.status(409).json({ message: "Tip not found" });
    }
    await Tip.findByIdAndRemove(tipId);
   
    const allTips = await Tip.find(); // Get all tips from the database
   
    res.status(201).json(allTips); // Return all tips as a response
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Assuming you are using Express.js
const addReviewToTip = async (req, res) => {
  try {
    const { userId, stars, description } = req.body;
    const { tipId } = req.params;

    // Find the tip by its ID
    const tip = await Tip.findById(tipId);

    if (!tip) {
      return res.status(404).json({ error: "Tip not found" });
    }

    // Create a new review object
    const review = {
      user: userId,
      stars,
      description,
    };

    // Add the review to the tip's reviews array
    tip.reviews.push(review);

    // Save the updated tip
    await tip.save();

    // You can optionally populate the user field in the review
    // if you want to send the complete user object in the response
    await tip.populate("reviews.user").execPopulate();

    // Return the updated tip
    res.json(tip);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
