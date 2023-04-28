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

    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id !== friendId);
    } else {
      user.friends.push(friendId);
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

    console.log(req.body);

    const updatedProfile = await User.findByIdAndUpdate(
      id,
      { firstName, lastName, location, bio, picturePath },
      { new: true }
    );
    console.log("no crash");
    console.log(updatedProfile);
    res.status(200).json(updatedProfile);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
