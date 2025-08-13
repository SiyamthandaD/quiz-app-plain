import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import About from "./About";
import React, { useState, useEffect, useCallback } from "react";
import "./App.css";
import { PlayCircle, Clock, CheckCircle, XCircle, RefreshCcw, Code, Home, BookOpen } from "lucide-react";
import Footer from "./Footer";
import Study from './Study';
import StudyTopic from './StudyTopic';
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini API
const genAI = new GoogleGenerativeAI("AIzaSyArNd3AV-Iclw46t1eMd7aOY8q3HQMCA9I");

// Enhanced Navbar with active link highlighting
const Navbar = () => {
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState("/");

  useEffect(() => {
    setActiveLink(window.location.pathname);
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo" onClick={() => navigate("/")}>
          <Code size={30} className="icon" />
          <span>Web Dev Quiz</span>
        </div>
        <div className="nav-links">
          <Link to="/" className={activeLink === "/" ? "active" : ""} onClick={() => setActiveLink("/")}>
            <Home size={20} className="nav-icon" />
            <span>Home</span>
          </Link>
          <Link
            to="/study"
            className={activeLink.startsWith("/study") ? "active" : ""}
            onClick={() => setActiveLink("/study")}>
            <BookOpen size={20} className="nav-icon" />
            <span>Study</span>
          </Link>
          <Link to="/about" className={activeLink === "/about" ? "active" : ""} onClick={() => setActiveLink("/about")}>
            <BookOpen size={20} className="nav-icon" />
            <span>About</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

const QuizApp = () => {
  const [quizStarted, setQuizStarted] = useState(false);
  const [showTopicSelection, setShowTopicSelection] = useState(false);
  const [showDifficultySelection, setShowDifficultySelection] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [timer, setTimer] = useState(60);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const topics = ["HTML", "CSS", "JavaScript", "React", "Python", "Java", "C#", "C++", "Software Development Concepts"];

  const difficulties = ["Easy", "Medium", "Hard"];

  const startQuiz = () => {
    setShowTopicSelection(true);
  };

  const handleTopicSelect = (topic) => {
    setSelectedTopic(topic);
    setShowTopicSelection(false);
    setShowDifficultySelection(true);
  };

  // Enhanced question generation with retry logic
  const generateQuestionsWithGemini = useCallback(async (topic, difficulty, retryCount = 0) => {
    setIsLoading(true);
    setError(null);

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = `Generate 5 ${difficulty.toLowerCase()} level MCQs about ${topic} for web development.
      Format as JSON array with objects containing:
      {
        "question": "Question text",
        "options": ["Option1", "Option2", "Option3", "Option4"],
        "correctAnswer": "CorrectOption",
        "explanation": "Brief explanation",
        "topic": "${topic}",
        "difficulty": "${difficulty}"
      }`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      try {
        const cleanedText = text.replace(/```json|```/g, "").trim();
        const questions = JSON.parse(cleanedText);

        if (!Array.isArray(questions) || questions.length === 0) {
          throw new Error("Invalid question format");
        }

        setQuestions(questions);
        setQuizStarted(true);
        setTimer(60);
      } catch (e) {
        if (retryCount < 2) {
          await generateQuestionsWithGemini(topic, difficulty, retryCount + 1);
        } else {
          throw e;
        }
      }
    } catch (err) {
      setError("Failed to generate questions. Please try again later.");
      console.error("Generation error:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleDifficultySelect = (difficulty) => {
    setSelectedDifficulty(difficulty);
    setShowDifficultySelection(false);
    generateQuestionsWithGemini(selectedTopic, difficulty);
  };

  useEffect(() => {
    if (quizStarted && !showResults && questions.length > 0) {
      const timerInterval = setInterval(() => {
        setTimer((prev) => {
          if (prev > 0) return prev - 1;
          clearInterval(timerInterval);
          handleTimeOut();
          return 0;
        });
      }, 1000);
      return () => clearInterval(timerInterval);
    }
  }, [quizStarted, currentQuestionIndex, showResults, questions]);

  const handleTimeOut = () => {
    if (questions.length === 0) return;

    setScore((prev) => prev - 1);
    setUserAnswers((prev) => [
      ...prev,
      {
        question: questions[currentQuestionIndex].question,
        userAnswer: "Skipped (Time Out)",
        correctAnswer: questions[currentQuestionIndex].correctAnswer,
        isCorrect: false
      }
    ]);
    setTimeout(nextQuestion, 1500);
  };

  const handleAnswerClick = (answer) => {
    if (selectedAnswer !== null || questions.length === 0) return;

    setSelectedAnswer(answer);
    const isCorrect = answer === questions[currentQuestionIndex].correctAnswer;
    if (isCorrect) setScore((prev) => prev + 1);

    setUserAnswers((prev) => [
      ...prev,
      {
        question: questions[currentQuestionIndex].question,
        userAnswer: answer,
        correctAnswer: questions[currentQuestionIndex].correctAnswer,
        isCorrect: isCorrect
      }
    ]);

    setTimeout(nextQuestion, 1500);
  };

  const nextQuestion = () => {
    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < questions.length) {
      setCurrentQuestionIndex(nextIndex);
      setTimer(60);
      setSelectedAnswer(null);
    } else {
      setShowResults(true);
    }
  };

  const restartQuiz = () => {
    setQuizStarted(false);
    setShowTopicSelection(false);
    setShowDifficultySelection(false);
    setSelectedTopic(null);
    setSelectedDifficulty(null);
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowResults(false);
    setTimer(60);
    setSelectedAnswer(null);
    setUserAnswers([]);
    setQuestions([]);
    setError(null);
  };

  const getButtonClass = (answer) => {
    if (selectedAnswer === null || questions.length === 0) return "option-button";
    const isCorrect = answer === questions[currentQuestionIndex].correctAnswer;
    const isSelected = answer === selectedAnswer;

    if (isSelected) return isCorrect ? "option-button correct" : "option-button incorrect";
    if (isCorrect) return "option-button correct";
    return "option-button";
  };

  // Enhanced results display
  const ResultsScreen = () => {
    return (
      <div className="results-screen">
        <div className="results-header">
          <h1>Quiz Complete!</h1>
          <div className="score-display">
            <span className="score">{score}</span>
            <span className="divider">/</span>
            <span className="total">{questions.length}</span>
          </div>
          <p className="topic-info">
            {selectedTopic} • {selectedDifficulty}
          </p>
        </div>

        <div className="results-summary">
          <h3>Performance Breakdown</h3>
          {userAnswers.map((result, index) => (
            <div key={index} className={`result-item ${result.isCorrect ? "correct" : "incorrect"}`}>
              <p className="question-text">
                <span className="q-number">{index + 1}.</span>
                {result.question}
              </p>
              <div className="answer-details">
                <p>
                  Your answer:{" "}
                  <span className={result.isCorrect ? "correct-answer" : "wrong-answer"}>{result.userAnswer}</span>
                </p>
                {!result.isCorrect && (
                  <>
                    <p>
                      Correct answer: <span className="correct-answer">{result.correctAnswer}</span>
                    </p>
                    <p className="explanation">
                      <span className="explanation-label">Explanation:</span>
                      {questions[index]?.explanation || "No explanation available"}
                    </p>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="results-actions">
          <button onClick={restartQuiz} className="restart-button">
            <RefreshCcw className="icon" size={20} />
            Restart Quiz
          </button>
          <button onClick={() => navigate("/")} className="home-button">
            <Home className="icon" size={20} />
            Return Home
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="quiz-wrapper">
      {!quizStarted && !showTopicSelection && !showDifficultySelection && (
        <div className="start-screen">
          <h1>Web Dev Quiz</h1>
          <p>Test your knowledge of web development.</p>
          <button onClick={startQuiz} className="start-button">
            <PlayCircle className="icon" size={24} />
            Start Quiz
          </button>
        </div>
      )}

      {showTopicSelection && (
        <div className="selection-screen">
          <h2>Select a Topic</h2>
          <div className="options-grid">
            {topics.map((topic, index) => (
              <button
                key={index}
                onClick={() => handleTopicSelect(topic)}
                className="option-button"
                disabled={isLoading}>
                {topic}
              </button>
            ))}
          </div>
        </div>
      )}

      {showDifficultySelection && (
        <div className="selection-screen">
          <h2>Select Difficulty Level</h2>
          <div className="options-grid">
            {difficulties.map((difficulty, index) => (
              <button
                key={index}
                onClick={() => handleDifficultySelect(difficulty)}
                className="option-button"
                disabled={isLoading}>
                {difficulty}
              </button>
            ))}
          </div>
        </div>
      )}

      {isLoading && (
        <div className="loading-screen">
          <p>
            Generating {selectedDifficulty?.toLowerCase()} {selectedTopic} questions...
          </p>
          <div className="spinner"></div>
        </div>
      )}

      {error && (
        <div className="error-screen">
          <p>{error}</p>
          <button onClick={restartQuiz} className="restart-button">
            <RefreshCcw className="icon" size={20} />
            Try Again
          </button>
        </div>
      )}

      {quizStarted && !showResults && questions.length > 0 && !isLoading && !error && (
        <div className="question-container">
          <div className="question-header">
            <span>
              Question {currentQuestionIndex + 1}/{questions.length}
            </span>
            <div className="topic-difficulty">
              {selectedTopic} • {selectedDifficulty}
            </div>
            <div className="timer">
              <Clock className="icon" size={20} />
              <span>{timer}s</span>
            </div>
          </div>

          <div className="question-card">
            <h2>{questions[currentQuestionIndex].question}</h2>
            <div className="options-grid">
              {questions[currentQuestionIndex].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerClick(option)}
                  disabled={selectedAnswer !== null}
                  className={getButtonClass(option)}>
                  {option}
                </button>
              ))}
            </div>
          </div>

          {selectedAnswer && (
            <div className="feedback">
              {selectedAnswer === questions[currentQuestionIndex].correctAnswer ? (
                <span className="correct-feedback">
                  <CheckCircle className="icon" /> Correct!
                </span>
              ) : (
                <span className="incorrect-feedback">
                  <XCircle className="icon" /> Incorrect.
                </span>
              )}
              <p>
                The correct answer was: <span>{questions[currentQuestionIndex].correctAnswer}</span>
              </p>
              {questions[currentQuestionIndex].explanation && (
                <p className="explanation">
                  <span className="explanation-label">Explanation:</span>
                  {questions[currentQuestionIndex].explanation}
                </p>
              )}
            </div>
          )}
        </div>
      )}

      {showResults && questions.length > 0 && <ResultsScreen />}
    </div>
  );
};

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <div className="content-wrapper">
          <Routes>
            <Route path="/" element={<QuizApp />} />
            <Route path="/study" element={<Study />} />
            <Route path="/study/:topic" element={<StudyTopic />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
