const router = require("express").Router();
const contactRoutes = require("./contact");
const forgotRoutes = require("./forgot");

// Contact routes
router.use("/contact", contactRoutes);

// Forgot routes
router.use("/forgot", forgotRoutes);

module.exports = router;
