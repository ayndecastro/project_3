const router = require("express").Router();
const bookRoutes = require("./trip");

// Book routes
router.use("/trip", bookRoutes);

module.exports = router;
