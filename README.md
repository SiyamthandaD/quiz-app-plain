# Web Dev Quiz

🔗 **[Live Demo](https://siyamthanda-dlakavu-profile.netlify.app/)**

## 📝 Overview

An interactive quiz application designed to test and improve web development knowledge through AI-powered questions and curated learning resources.

✨ Features
🧠 Quiz System
Feature	Description
📚 Multiple Topics	HTML, CSS, JavaScript, React, Python, etc.
🎚️ Difficulty Levels	Easy, Medium, Hard
⏱️ Timed Questions	60 seconds per question
💡 Instant Feedback	Explanations for answers
📊 Score Tracking	Performance breakdown
📖 Study Resources
Topic selection menu

Curated W3Schools links

Code examples and references

🛠️ Tech Stack
Frontend: React.js

AI Integration: Google Gemini API

Hosting: Netlify

Styling: Tailwind CSS

🚀 Installation
Prerequisites
Node.js (v16+)

npm/Yarn

Google Gemini API key

bash
# Clone repository
(https://github.com/SiyamthandaD/quiz-app-plain)

cd web-dev-quiz

# Install dependencies
npm install

# Configure environment
echo "VITE_GEMINI_API_KEY=your_api_key" > .env

# Start development server
npm run dev

🤖 AI Implementation
javascript
// Example question generation
const generateQuestions = async (topic, difficulty) => {
  const prompt = `Generate 5 ${difficulty} MCQs about ${topic} in JSON format with:
  - question
  - options
  - correctAnswer
  - explanation`;
  
  const response = await gemini.generateContent(prompt);
  return JSON.parse(response);
}
🔜 Roadmap
User authentication

Progress tracking

Dark/Light mode

Expanded topics

Leaderboard system

📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

<div align="center"> <sub>Built with ❤️ by Siyamthanda Dlakavu</sub> </div>
