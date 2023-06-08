import Post from "../models/Post.js";
import User from "../models/User.js";

/* CREATE */
export const createPost = async (req, res) => {
  try {
    console.log("body: ", req.body);
    const { title, description, category, picturePath } = req.body;
    const { id } = req.params;
    const user = await User.findById(id);
    const newPost = new Post({
      userId: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      title: title,
      description: description,
      userPicturePath: user.picturePath,
      picturePath: picturePath,
      category: category,
      likes: {},
      comments: [],
    });
    await newPost.save();

    const post = await Post.find();
    res.status(201).json(post);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

/* READ */
export const getFeedPosts = async (req, res) => {
  try {
    const post = await Post.find();
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId });
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await Post.findOne({ _id: postId });
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const editPost = async (req, res) => {
  try {
    const { title, description, picturePath } = req.body;
    const { id } = req.params;

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { title, description, picturePath },
      { new: true }
    );
    
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

/* DELETE */
export const deletePost = async (req, res) => {
  const { postId } = req.params;
  const { userId } = req.body;
  console.log("userID :", userId);
  console.log("aixci");
  try {
    const post = await Post.findById(postId);
    console.log("post : ",post);
    console.log("postid :",postId);
    if (!post) {
      return res.status(409).json({ message: "Post not found" });
    }
    await Post.findByIdAndRemove(postId);
   
    const allPosts = await Post.find(); // Get all posts from the database
   
    res.status(201).json(allPosts); // Return all posts as a response
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Assuming you are using Express.js
const addReviewToPost = async (req, res) => {
  try {
    const { userId, stars, description } = req.body;
    const { postId } = req.params;

    // Find the post by its ID
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Create a new review object
    const review = {
      user: userId,
      stars,
      description,
    };

    // Add the review to the post's reviews array
    post.reviews.push(review);

    // Save the updated post
    await post.save();

    // You can optionally populate the user field in the review
    // if you want to send the complete user object in the response
    await post.populate("reviews.user").execPopulate();

    // Return the updated post
    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
