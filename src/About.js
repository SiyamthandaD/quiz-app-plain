import React from 'react';
import './About.css';
import { Code, Clock, BarChart2, Award } from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: <Code size={24} />,
      title: "Multiple Technologies",
      description: "Covering HTML, CSS, JavaScript, React, and more."
    },
    {
      icon: <Clock size={24} />,
      title: "Timed Challenges",
      description: "60 seconds per question to test your quick thinking."
    },
    {
      icon: <BarChart2 size={24} />,
      title: "Detailed Analytics",
      description: "Track your progress and identify weak areas."
    },
    {
      icon: <Award size={24} />,
      title: "Achievements",
      description: "Earn badges for completing challenges."
    }
  ];

  return (
    <div className="about-container">
      <h1>About Web Dev Quiz</h1>
      <div className="about-content">
        <section className="mission-section">
          <h2>Our Mission</h2>
          <p>
            Web Dev Quiz is designed to help developers test and improve their knowledge 
            of web development technologies through interactive, challenging quizzes.
          </p>
        </section>
        
        <section className="how-it-works">
          <h2>How It Works</h2>
          <div className="steps-grid">
            {[
              "Select a topic and difficulty.",
              "Answer timed questions.",
              "Get instant feedback.",
              "Review detailed explanations.",
              "Track your progress."
            ].map((step, index) => (
              <div key={index} className="step-card">
                <div className="step-number">{index + 1}</div>
                <p>{step}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="features-section">
          <h2>Key Features</h2>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;