const express = require("express");
const Analysis = require("../models/Analysis");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const analyses =
            await Analysis.find().sort({
                createdAt: -1,
            });

        res.json(analyses);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }

    router.delete("/:id", async (req, res) => {
        try {
            await Analysis.findByIdAndDelete(
                req.params.id
            );

            res.json({
                message:
                    "Analysis deleted successfully",
            });
        } catch (error) {
            res.status(500).json({
                message: error.message,
            });
        }
    });

});

module.exports = router;