import Tip from "../models/Tip.js";
import User from "../models/User.js";

/* CREATE */
export const createTip = async (req, res) => {
  try {
    const { userId, description, picturePath, videoPath } = req.body;
    const user = await User.findById(userId);
    const newTip = new Tip({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      videoPath,
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