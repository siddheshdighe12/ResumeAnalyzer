const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const analyzeResume = async (resumeText) => {
  const prompt = `
You are an ATS Resume Analyzer.

Analyze this resume and return ONLY valid JSON.

{
  "atsScore": 0,
  "jobRoles": [],
  "strengths": [],
  "missingSkills": [],
  "suggestions": []
}

Resume:

${resumeText}
`;

  const result = await model.generateContent(prompt);

  return result.response.text();
};

module.exports = analyzeResume;