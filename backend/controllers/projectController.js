const axios = require("axios");

exports.generateProject = async (req, res) => {
  try {
    const { topic, level, domain } = req.body;

    if (!topic || !level || !domain) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const prompt = `
Generate a student academic project with:
Title: ${topic}
Domain: ${domain}
Level: ${level}

Include:
1. Project Overview
2. Problem Statement
3. Objectives
4. Tech Stack
5. System Architecture (text)
6. Modules
7. Flow of Project
8. Future Enhancements
`;

    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
      {
        contents: [
          {
            parts: [{ text: prompt }]
          }
        ]
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": process.env.GEMINI_API_KEY
        }
      }
    );

    res.json({
      result: response.data.candidates[0].content.parts[0].text
    });

  } catch (error) {
    console.error("Gemini Error:", JSON.stringify(error.response?.data || error.message, null, 2));
    res.status(500).json({ error: "Failed to generate project" });
  }
};
