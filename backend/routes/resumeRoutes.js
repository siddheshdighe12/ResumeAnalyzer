const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const {
  uploadResume,
} = require("../controllers/resumeController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Create uploads folder if it doesn't exist
const uploadDir = path.join(__dirname, "..", "uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },

  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() + "-" + file.originalname
    );
  },
});

const upload = multer({ storage });

router.post(
  "/upload",
  protect,
  upload.single("resume"),
  uploadResume
);

module.exports = router;