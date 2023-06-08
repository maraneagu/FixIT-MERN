import Tip from "../models/Tip.js";
import User from "../models/User.js";

/* CREATE */
export const createTip = async (req, res) => {
  try {
    console.log("body: ", req.body);
    const { title, description, category, picturePath, videoPath } = req.body;
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
      picturePath: picturePath,
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
    const { title, description, picturePath, videoPath } = req.body;
    const { id } = req.params;

    const updatedTip = await Tip.findByIdAndUpdate(
      id,
      { title, description, picturePath, videoPath },
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