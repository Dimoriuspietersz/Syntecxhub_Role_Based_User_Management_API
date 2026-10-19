require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Health check
app.get("/", (req, res) => {
    res.status(200).json({
        message: "Role-Based User Management API is running"
    });
});

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);

// Handle unknown routes
app.use((req, res) => {
    res.status(404).json({
        message: "Route not found"
    });
});

// Connect to MongoDB before accepting requests
const startServer = async () => {
    await connectDB();

    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
};

startServer();