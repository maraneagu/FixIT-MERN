import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

/* REGISTER USER */
export const register = async (req, res) => {
  try {
    // Extract user data from the request body
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      location,
      isClient,
    } = req.body;

    // Generate a salt and hash the password
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    // Create a new user instance
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath,
      friends,
      location,
      isClient,
    });

    // Save the user to the database
    const savedUser = await newUser.save();

    // Respond with the saved user data
    res.status(201).json(savedUser);
  } catch (err) {
    // Handle any errors that occur during registration
    res.status(500).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    // Extract email and password from the request body
    const { email, password } = req.body;

    // Find the user with the provided email
    const user = await User.findOne({ email: email });

    // If the user doesn't exist, return an error response
    if (!user) return res.status(400).json({ msg: "User does not exist. " });

    // Compare the provided password with the hashed password stored in the database
    const isMatch = await bcrypt.compare(password, user.password);

    // If the passwords don't match, return an error response
    if (!isMatch) return res.status(400).json({ msg: "Wrong password. " });

    // Generate a JSON Web Token (JWT) with the user's ID
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    // Remove the password field from the user object
    delete user.password;

    // Respond with the token and user data
    res.status(200).json({ token, user });
  } catch (err) {
    // Handle any errors that occur during login
    res.status(500).json({ error: err.message });
  }
};
