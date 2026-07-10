const analyzeATS = (resumeText) => {
  const requiredSkills = [
    "React",
    "JavaScript",
    "TypeScript",
    "Node.js",
    "MongoDB",
    "Express",
    "Git",
    "Docker",
    "AWS",
    "HTML",
    "CSS",
  ];

  const matchedSkills = [];
  const missingSkills = [];

  requiredSkills.forEach((skill) => {
    if (
      resumeText
        .toLowerCase()
        .includes(skill.toLowerCase())
    ) {
      matchedSkills.push(skill);
    } else {
      missingSkills.push(skill);
    }
  });

  const atsScore = Math.round(
    (matchedSkills.length /
      requiredSkills.length) *
      100
  );

  const suggestions = [];

  if (missingSkills.includes("React")) {
    suggestions.push(
      "Add React projects to improve frontend ATS score"
    );
  }

  if (missingSkills.includes("Docker")) {
    suggestions.push(
      "Mention Docker experience"
    );
  }

  if (missingSkills.includes("AWS")) {
    suggestions.push(
      "Add cloud deployment experience"
    );
  }

  if (suggestions.length === 0) {
    suggestions.push(
      "Resume looks strong for ATS systems"
    );
  }

  return {
    atsScore,
    matchedSkills,
    missingSkills,
    suggestions,
  };
};

module.exports = analyzeATS;