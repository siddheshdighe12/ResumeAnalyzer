const fs = require("fs");
const pdfParse = require("pdf-parse");

const Analysis = require("../models/Analysis");
const analyzeResume = require("../services/groqService");

const uploadResume = async (req, res) => {
  try {
    // Check file
    if (!req.file) {
      return res.status(400).json({
        message: "No resume uploaded",
      });
    }

    // Read uploaded PDF
    const dataBuffer = fs.readFileSync(req.file.path);

    // Extract PDF text
    const pdfData = await pdfParse(dataBuffer);

    // Analyze using Groq AI
    const analysis = await analyzeResume(pdfData.text);

    // Save analysis with logged-in user
    const savedAnalysis = await Analysis.create({
      userId: req.user._id,

      fileName: req.file.originalname,

      atsScore: analysis.atsScore,

      matchedSkills: analysis.matchedSkills,

      missingSkills: analysis.missingSkills,

      suggestions: analysis.suggestions,
    });

    // Delete uploaded file
    if (fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    res.status(200).json({
      message: "Resume analyzed successfully",
      analysis: savedAnalysis,
    });
  } catch (error) {
    console.error("Resume Upload Error:", error);

    // Delete uploaded file if something failed
    if (
      req.file &&
      fs.existsSync(req.file.path)
    ) {
      fs.unlinkSync(req.file.path);
    }

    res.status(500).json({
      message: "Failed to analyze resume",
      error: error.message,
    });
  }
};

module.exports = {
  uploadResume,
};