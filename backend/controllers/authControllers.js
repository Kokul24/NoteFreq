import User from "../models/User.js";
import jwt from "jsonwebtoken";

// Generate JWT Token
const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET || 'your-secret-key-here', {
        expiresIn: '30d'
    });
};

// Register User
export async function register(req, res) {
    try {
        const { username, email, password } = req.body;

        // Check if user already exists
        const userExists = await User.findOne({ $or: [{ email }, { username }] });
        if (userExists) {
            return res.status(400).json({ message: "User already exists with this email or username" });
        }

        // Create new user
        const user = await User.create({
            username,
            email,
            password
        });

        const token = generateToken(user._id);

        return res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            token
        });
    } catch (error) {
        console.error("Registration failed:", error);
        return res.status(500).json({ message: "Server error during registration" });
    }
}

// Login User
export async function login(req, res) {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Check password
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const token = generateToken(user._id);

        return res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            token
        });
    } catch (error) {
        console.error("Login failed:", error);
        return res.status(500).json({ message: "Server error during login" });
    }
}

// Get Current User
export async function getCurrentUser(req, res) {
    try {
        const user = await User.findById(req.user.id).select('-password');
        return res.status(200).json(user);
    } catch (error) {
        console.error("Get user failed:", error);
        return res.status(500).json({ message: "Server error" });
    }
}
