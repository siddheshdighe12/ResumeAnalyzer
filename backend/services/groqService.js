const Groq = require("groq-sdk");

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

const analyzeResume = async (resumeText) => {
    const prompt = `
You are an expert ATS Resume Analyzer.

Analyze the following resume for a MERN Stack Developer role.

Return ONLY valid JSON.

Use exactly this format:

{
  "atsScore": 85,
  "matchedSkills": [
    "React",
    "JavaScript"
  ],
  "missingSkills": [
    "Docker",
    "AWS"
  ],
  "suggestions": [
    "Add Docker experience.",
    "Mention cloud deployment.",
    "Include measurable achievements."
  ]
}

Rules:
- Return ONLY JSON.
- No markdown.
- No explanation.
- ATS score between 0 and 100.
- Suggestions should be short and practical.

Resume:

${resumeText}
`;

    try {
        const completion =
            await groq.chat.completions.create({
                model: "llama-3.3-70b-versatile",
                temperature: 0.3,
                messages: [
                    {
                        role: "user",
                        content: prompt,
                    },
                ],
            });

        let response =
            completion.choices[0].message.content;

        // Remove markdown if AI returns it
        response = response
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        return JSON.parse(response);
    } catch (err) {
        console.error("Groq Error:", err);

        return {
            atsScore: 0,
            matchedSkills: [],
            missingSkills: [],
            suggestions: [
                "AI analysis failed. Please try again.",
            ],
        };
    }
};

module.exports = analyzeResume;