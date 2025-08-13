# 🚀 Web Dev Quiz - Interactive Learning Platform

[![Netlify Status](https://api.netlify.com/api/v1/badges/YOUR-DEPLOY-ID/deploy-status)](https://app.netlify.com/sites/YOUR-SITE-NAME/deploys)
![GitHub last commit](https://img.shields.io/github/last-commit/YOUR-USERNAME/YOUR-REPO)
![React](https://img.shields.io/badge/React-18.2-blue)
![Gemini](https://img.shields.io/badge/Gemini-API-orange)

🔗 **Live Demo:** [https://siyamthanda-dlakavu-profile.netlify.app/](https://siyamthanda-dlakavu-profile.netlify.app/)

## 🌟 Overview

Web Dev Quiz is an interactive quiz application designed to test and improve web development knowledge through AI-powered questions and curated learning resources.

```mermaid
graph TD
    A[User] --> B(Select Topic)
    B --> C{Quiz Mode?}
    C -->|Yes| D[Timed Quiz]
    C -->|No| E[Study Resources]
    D --> F[AI-Generated Questions]
    E --> G[W3Schools Tutorials]

✨ Key Features
🎯 Quiz System
Feature	Description
📚 Multi-Topic	HTML, CSS, JS, React, Python, Java, C#, C++
🎚️ Difficulty Levels	Easy, Medium, Hard
⏱️ Timed Questions	60 seconds per question
💡 Instant Feedback	Explanations for each answer
📊 Analytics	Performance breakdown by topic
📖 Study Resources
Direct links to W3Schools tutorials

Topic-specific reference materials

Code examples for each concept

⚙️ Technical Stack
Diagram
Code
🛠️ Installation Guide
Prerequisites
Node.js v16+

npm/Yarn

Google Gemini API key

Quick Start
bash
# Clone repository
git clone https://github.com/YOUR-USERNAME/YOUR-REPO.git
cd web-dev-quiz

# Install dependencies
npm install

# Configure environment
echo "VITE_GEMINI_API_KEY=your_api_key" > .env

# Start development server
npm run dev
🚀 Deployment
Netlify Setup
Connect your GitHub repository

Set build settings:

Build command: npm run build

Publish directory: dist

Add environment variables:

VITE_GEMINI_API_KEY

File Structure
text
src/
├── components/      # Reusable UI components
├── hooks/           # Custom React hooks
├── pages/           # Application routes
├── services/        # API services
├── utils/           # Helper functions
public/              # Static assets
🤖 AI Integration
The application uses Google's Gemini API to dynamically generate quiz questions:

javascript
// Example API request structure
const generateQuestions = async (topic, difficulty) => {
  const prompt = `Generate 5 ${difficulty} level MCQs about ${topic} with:
  - Question text
  - 4 options
  - Correct answer
  - Detailed explanation
  
  Return as JSON array`;
  
  const response = await gemini.generateContent(prompt);
  return JSON.parse(response);
}
📅 Roadmap
User authentication system

Progress tracking dashboard

Dark/light mode toggle

Expanded backend topics (Node.js, SQL)

Community leaderboard

📄 License
This project is licensed under the MIT License - see the LICENSE.md file for details.

🙏 Acknowledgments
Google Gemini API team

W3Schools for learning resources

Netlify for hosting support
