const User = require("../models/User");

// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find()
            .select("-password")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            message: "Users retrieved successfully",
            count: users.length,
            users
        });
    } catch (error) {
        return res.status(500).json({
            message: "Failed to retrieve users",
            error: error.message
        });
    }
};

// Block a user
const blockUser = async (req, res) => {
    try {
        const { id } = req.params;

        if (!/^[0-9a-fA-F]{24}$/.test(id)) {
            return res.status(400).json({
                message: "Invalid user ID"
            });
        }

        if (id === req.user.userId) {
            return res.status(400).json({
                message: "You cannot block your own account"
            });
        }

        const user = await User.findByIdAndUpdate(
            id,
            { $set: { isBlocked: true } },
            { new: true, runValidators: true }
        ).select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        return res.status(200).json({
            message: "User blocked successfully",
            user
        });
    } catch (error) {
        return res.status(500).json({
            message: "Failed to block user",
            error: error.message
        });
    }
};

// Promote a normal user to admin
const promoteUser = async (req, res) => {
    try {
        const { id } = req.params;

        if (!/^[0-9a-fA-F]{24}$/.test(id)) {
            return res.status(400).json({
                message: "Invalid user ID"
            });
        }

        if (id === req.user.userId) {
            return res.status(400).json({
                message: "You cannot promote yourself"
            });
        }

        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        if (user.role === "admin") {
            return res.status(400).json({
                message: "User is already an admin"
            });
        }

        user.role = "admin";
        await user.save();

        const safeUser = await User.findById(user._id)
            .select("-password");

        return res.status(200).json({
            message: "User promoted to admin successfully",
            user: safeUser
        });
    } catch (error) {
        return res.status(500).json({
            message: "Failed to promote user",
            error: error.message
        });
    }
};

module.exports = {
    getAllUsers,
    blockUser,
    promoteUser
};