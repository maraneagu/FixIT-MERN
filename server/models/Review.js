import mongoose from "mongoose";

const reviewSchema = mongoose.Schema({
    postId: {
        type: String,
        required: true,
      },
  userId: {
    type: String,
    required: true,
  },
  stars: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const Review = mongoose.model("Review", reviewSchema);

export default Review;