import User from "../models/User.js";
import Post from "../models/Post.js";

/* READ */
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, location, picturePath, isClient, bio }) => {
        return {
          _id,
          firstName,
          lastName,
          location,
          picturePath,
          isClient,
          bio,
        };
      }
    );
    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
export const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    //const friend = await User.findById(friendId);
    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id !== friendId);
      
      //friend.followers = friend.followers.filter((idd) => idd !== id);
    } else {
      user.friends.push(friendId);
      //user.followers.push(friendId);
    }

    await user.save();
    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    console.log(friends);
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, location, picturePath, isClient, bio }) => {
        return {
          _id,
          firstName,
          lastName,
          location,
          picturePath,
          isClient,
          bio,
        };
      }
    );

    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const editUser = async (req, res) => {
  try {
    const { firstName, lastName, location, bio, picturePath } = req.body;
    const { id } = req.params;

    const updatedProfile = await User.findByIdAndUpdate(
      id,
      { firstName, lastName, location, bio, picturePath },
      { new: true }
    );

    try {
      await Post.updateMany(
        { userId: id },
        { $set: { firstName, lastName, userPicturePath: picturePath } }
      );
    } catch (err) {
      console.error(err);
      // handle the error appropriately
    }
    

    console.log("no crash");
    console.log(updatedProfile);
    res.status(200).json(updatedProfile);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};
