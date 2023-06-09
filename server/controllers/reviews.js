import Post from "../models/Post.js";
import User from "../models/User.js";
import Review from "../models/Review.js";

/* CREATE */
export const createReview = async (req, res) => {
  try {
    console.log("body: ", req.body);
    const { stars, description } = req.body;
    const { userId, postId } = req.params;
    const user = await User.findById(userId);
    const post= await Post.findById(postId);
    const newReview = new Review({
      userId: user._id,
      description: description,
      stars:  stars,
      postId: post._id,
    });
    await newReview.save();

    const review = await Review.find();
    res.status(201).json(review);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

export const getPostReviews = async (req, res) => {
  try {
    const { postId } = req.params;
    const review = await Review.find({ postId });
    console.log("am ajuns");
    console.log(postId);
    res.status(200).json(review);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// DELETE
export const deleteReview = async (req, res) => {
  const { reviewId } = req.params;
  const { postId } = req.body;

  try {
    const review = await Review.findById(reviewId);
   
    if (!review) {
      return res.status(409).json({ message: "Review not found" });
    }
    await Review.findByIdAndRemove(reviewId);
   
    const allReviews = await Review.find({ postId }); // Get all reviews from the database
   
    res.status(201).json(allReviews); // Return all reviews as a response
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};