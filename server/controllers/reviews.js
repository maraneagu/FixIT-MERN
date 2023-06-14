import Post from "../models/Post.js";
import User from "../models/User.js";
import Review from "../models/Review.js";

/* CREATE */
export const createReview = async (req, res) => {
  try {
    // Extract review data from the request body and user/post IDs from request params
    const { stars, description } = req.body;
    const { userId, postId } = req.params;

    // Find the user and post based on the user/post IDs
    const user = await User.findById(userId);
    const post = await Post.findById(postId);

    // Create a new review instance with user, post, and review data
    const newReview = new Review({
      userId: user._id,
      description: description,
      stars: stars,
      postId: post._id,
    });

    // Save the new review to the database
    await newReview.save();

    // Retrieve all reviews from the database
    const review = await Review.find();

    // Respond with the updated list of reviews
    res.status(201).json(review);
  } catch (err) {
    // Handle any errors that occur during review creation
    res.status(409).json({ message: err.message });
  }
};

/* GET */
export const getPostReviews = async (req, res) => {
  try {
    // Extract the post ID from the request params
    const { postId } = req.params;

    // Retrieve all reviews associated with the post ID
    const review = await Review.find({ postId });

    // Respond with the list of post reviews
    res.status(200).json(review);
  } catch (err) {
    // Handle any errors that occur during retrieval of post reviews
    res.status(404).json({ message: err.message });
  }
};

/* DELETE */
export const deleteReview = async (req, res) => {
  const { reviewId } = req.params;
  const { postId } = req.body;

  try {
    // Find the review with the provided review ID
    const review = await Review.findById(reviewId);

    // If the review doesn't exist, return an error response
    if (!review) {
      return res.status(409).json({ message: "Review not found" });
    }

    // Remove the review from the database
    await Review.findByIdAndRemove(reviewId);

    // Get all reviews associated with the post ID from the database
    const allReviews = await Review.find({ postId });

    // Respond with the updated list of reviews
    res.status(201).json(allReviews);
  } catch (error) {
    // Handle any errors that occur during review deletion
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
