Web Dev Quiz

Live Demo: https://siyamthanda-dlakavu-profile.netlify.app/

1. Overview 

Web Dev Quiz is an interactive quiz application designed to test and improve web development knowledge. It features: 

Timed quizzes on various topics (HTML, CSS, JavaScript, React, etc.). 

AI-generated questions using Google's Gemini API. 

Study resources with links to W3Schools tutorials. 

Progress tracking with score summaries and explanations. 

2. Features 

Quiz Features 

✅ Multiple Topics: HTML, CSS, JavaScript, React, Python, Java, C#, C++, and Software Development Concepts. 
✅ Difficulty Levels: Easy, Medium, Hard. 
✅ Timed Questions: 60 seconds per question. 
✅ Instant Feedback: Correct/incorrect answers with explanations. 
✅ Score Tracking: Final results with performance breakdown. 

Study Features 

📚 Topic Selection: Choose a topic to study. 
🔗 Curated Resources: Direct links to W3Schools tutorials, references, and examples. 

Technical Features 

⚡ React.js: Frontend built with React. 
🤖 Gemini API: AI-powered question generation. 
🚀 Netlify Deployment: Hosted on Netlify for easy access. 

3. Installation & Setup 

Prerequisites 

Node.js (v16+). 

npm / Yarn. 

Google Gemini API Key (for question generation). 

Steps to Run Locally 

Clone the repository: 

bash 

git clone https://github.com/your-repo/web-dev-quiz.git 
cd web-dev-quiz 

Install dependencies: 

bash 

npm install 

Set up environment variables: 
Create a .env file: 

env 

VITE_GEMINI_API_KEY=your_api_key_here 

Run the app: 

bash 

npm run dev 

Build for production: 

bash 

npm run build 


4. Deployment (Netlify) 

Manual Deployment 

Build the app: 

bash 

npm run build 

Drag & drop the build folder into Netlify. 

Automated Deployment (GitHub/GitLab) 

Connect your repo to Netlify. 

Set: 

Build command: npm run build. 

Publish directory: build. 

Add environment variables (if using Gemini API). 

5. File Structure 

text 

src/ 
├── App.js           # Main app with routing 
├── About.js         # About page 
├── Study.js         # Study topics selection 
├── StudyTopic.js    # Study resources per topic 
├── Footer.js        # Footer component 
├── index.js         # React entry point 
public/ 
├── index.html       # Base HTML 
.env                 # Environment variables 

6. API Usage (Gemini AI) 

The app uses Google's Gemini API to generate quiz questions dynamically. 

Prompt Structure 

js 

`Generate 5 ${difficulty} level MCQs about ${topic} for web development. 
Format as JSON array with: 
{ 
  "question": "Question text", 
  "options": ["Option1", "Option2", "Option3", "Option4"], 
  "correctAnswer": "CorrectOption", 
  "explanation": "Brief explanation" 
}` 

7. Future Improvements 

🔹 User Accounts: Save progress and scores. 
🔹 Leaderboard: Compare scores with others. 
🔹 More Topics: Expand to backend (Node.js, SQL). 
🔹 Dark/Light Mode: Better theme support. 
