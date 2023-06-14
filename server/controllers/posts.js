import Post from "../models/Post.js";
import User from "../models/User.js";

/* CREATE */
export const createPost = async (req, res) => {
  try {
    // Extract post data from the request body and user ID from request params
    const { title, description, category, picturePath } = req.body;
    const { id } = req.params;

    // Find the user based on the user ID
    const user = await User.findById(id);

    // Create a new post instance with user and post data
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

    // Save the new post to the database
    await newPost.save();

    // Retrieve all posts from the database
    const post = await Post.find();

    // Respond with the updated list of posts
    res.status(201).json(post);
  } catch (err) {
    // Handle any errors that occur during post creation
    res.status(409).json({ message: err.message });
  }
};

/* READ */
export const getFeedPosts = async (req, res) => {
  try {
    // Retrieve all posts from the database
    const post = await Post.find();

    // Respond with the list of posts
    res.status(200).json(post);
  } catch (err) {
    // Handle any errors that occur during retrieval of feed posts
    res.status(404).json({ message: err.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    // Extract the user ID from the request params
    const { userId } = req.params;

    // Retrieve all posts associated with the user ID
    const post = await Post.find({ userId });

    // Respond with the list of user posts
    res.status(200).json(post);
  } catch (err) {
    // Handle any errors that occur during retrieval of user posts
    res.status(404).json({ message: err.message });
  }
};

export const getPost = async (req, res) => {
  try {
    // Extract the post ID from the request params
    const { postId } = req.params;

    // Find the post with the provided post ID
    const post = await Post.findOne({ _id: postId });

    // Respond with the post data
    res.status(200).json(post);
  } catch (err) {
    // Handle any errors that occur during retrieval of a single post
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
export const likePost = async (req, res) => {
  try {
    // Extract the post ID from the request params and the user ID from the request body
    const { id } = req.params;
    const { userId } = req.body;

    // Find the post with the provided post ID
    const post = await Post.findById(id);

    // Check if the user has already liked the post
    const isLiked = post.likes.get(userId);

    // Update the likes for the post based on the user's action
    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    // Update the post with the modified likes and retrieve the updated post data
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    // Respond with the updated post data
    res.status(200).json(updatedPost);
  } catch (err) {
    // Handle any errors that occur during post like
    res.status(404).json({ message: err.message });
  }
};

export const editPost = async (req, res) => {
  try {
    // Extract the updated post data and the post ID from the request body and params, respectively
    const { title, description, picturePath } = req.body;
    const { id } = req.params;

    // Update the post with the new data and retrieve the updated post data
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { title, description, picturePath },
      { new: true }
    );

    // Respond with the updated post data
    res.status(200).json(updatedPost);
  } catch (err) {
    // Handle any errors that occur during post editing
    res.status(409).json({ message: err.message });
  }
};

/* DELETE */
export const deletePost = async (req, res) => {
  const { postId } = req.params;
  const { userId } = req.body;

  try {
    // Find the post with the provided post ID
    const post = await Post.findById(postId);
   
    // If the post doesn't exist, return an error response
    if (!post) {
      return res.status(409).json({ message: "Post not found" });
    }

    // Remove the post from the database
    await Post.findByIdAndRemove(postId);
   
    // Get all posts from the database
    const allPosts = await Post.find();
   
    // Respond with the updated list of posts
    res.status(201).json(allPosts);
  } catch (error) {
    // Handle any errors that occur during post deletion
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
