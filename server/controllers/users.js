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
    //const friend = await User.findById(friendId);
    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id !== friendId);
      
      //friend.followers = friend.followers.filter((idd) => idd !== id);
    } else {
      user.friends.push(friendId);
      //user.followers.push(friendId);
    }

    await user.save();
    //await friend.save();
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
    const { firstName, lastName, location, bio } = req.body;
    const { id } = req.params;

    console.log("ajung vreodata aici?");

    const updatedProfile = await User.findByIdAndUpdate(
      id,
      { firstName, lastName, location, bio },
      { new: true }
    );
    res.status(200).json(updatedProfile);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
