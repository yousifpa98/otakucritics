import { generateToken } from "../middleware/jwt.js";
import User from "../models/User.js";

// Create User Funktion
export const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Inputvalidation guard clause
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ message: "Username, email, and password are required." });
    }

    // Check if user with that username or email already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });

    if (existingUser) {
      return res.status(409).json({
        message:
          existingUser.email === email
            ? "Email is already in use."
            : "Username is already taken.",
      });
    }

    // Create the user
    const user = await User.create({ username, email, password });

    res.status(201).json({
      message: "User created successfully",
      user,
    });
  } catch (error) {
    console.error("Error creating user:", error);

    if (error.code === 11000) {
      return res.status(409).json({
        message: "Duplicate field error. Please check your username or email.",
      });
    }

    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

// Login function
export const login = async (req, res) => {
  try {
    // get login data from request body
    const { username, password } = req.body;

    // fetch user from db
    const user = await User.findOne({ username });

    // check if user exists
    if (!user) return res.status(404).json({ message: "User not found" });

    // verify pw
    const passwordMatch = await user.authenticate(password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Username or password wrong" });
    }

    // generate jwt
    const token = generateToken({ userId: user._id });

    // set cookie and send response
    res
      .status(200)
      .cookie("jwt", token, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      })
      .json({ message: "Login successful" });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// currentUser funct
export const currentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// logout funct
export const logout = (req, res) => {
  try {
    res
      .clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true })
      .status(200)
      .json({ message: "Logged out" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
