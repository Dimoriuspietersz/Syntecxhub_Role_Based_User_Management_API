const express = require("express");

const {
    getAllUsers,
    blockUser,
    promoteUser
} = require("../controllers/adminController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

// List all users — admin only
router.get(
    "/users",
    authMiddleware,
    roleMiddleware("admin"),
    getAllUsers
);

// Block a user — admin only
router.patch(
    "/users/:id/block",
    authMiddleware,
    roleMiddleware("admin"),
    blockUser
);

// Promote a user to admin — admin only
router.patch(
    "/users/:id/promote",
    authMiddleware,
    roleMiddleware("admin"),
    promoteUser
);

module.exports = router;