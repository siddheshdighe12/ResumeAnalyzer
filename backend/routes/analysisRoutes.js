const express = require("express");
const Analysis = require("../models/Analysis");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Get logged-in user's analyses
router.get("/", protect, async (req, res) => {
    try {
        const analyses = await Analysis.find({
            userId: req.user._id,
        }).sort({
            createdAt: -1,
        });

        res.json(analyses);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
});

// Delete logged-in user's analysis
router.delete("/:id", protect, async (req, res) => {
    try {
        const analysis = await Analysis.findOne({
            _id: req.params.id,
            userId: req.user._id,
        });

        if (!analysis) {
            return res.status(404).json({
                message: "Analysis not found",
            });
        }

        await Analysis.findByIdAndDelete(req.params.id);

        res.json({
            message: "Analysis deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
});

module.exports = router;