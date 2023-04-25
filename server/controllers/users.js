import User from "../models/User.js";

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
      ({ _id, firstName, lastName,  location, picturePath, isClient, bio }) => {
        return { _id, firstName, lastName,  location, picturePath, isClient, bio };
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

    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id !== friendId);
    } else {
      user.friends.push(friendId);
    }
 
    await user.save();
    //await friend.save();
    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    console.log(friends);
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, location, picturePath, isClient, bio }) => {
        return { _id, firstName, lastName, location, picturePath, isClient, bio };
      }
    );

    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const editUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;
    console.log("result");
    // Find the user by id
    const user = await User.findById(id);

    // If user doesn't exist, return error message
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user details
    user.name = name || user.name;
    user.email = email || user.email;
    user.password = password || user.password;

    // Save updated user details to database
    const updatedUser = await user.save();

    // Return updated user
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
