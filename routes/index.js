const path = require("path");
const router = require("express").Router();
const apiRoutes = require("./api");
const authRoutes = require("./auth");
const mailRoutes = require("./mail");
const resetRoutes = require("./reset");

// API Routes
router.use("/api", apiRoutes);

// Auth Routes
router.use("/auth", authRoutes);

// Auth Routes
router.use("/mail", mailRoutes);

// Reset Routes
router.use("/reset", resetRoutes);

// If no other routes are hit, send the React app
router.use(function(req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = router;
