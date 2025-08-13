import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Web Dev Quiz</h3>
          <p>Test and improve your web development knowledge with our interactive quizzes.</p>
        </div>
        
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3>Contact</h3>
          <p>Email: info@webdevquiz.com</p>
          <div className="social-links">
            <a href="#" aria-label="Twitter"><i className="icon">🐦</i></a>
            <a href="#" aria-label="GitHub"><i className="icon">💻</i></a>
            <a href="#" aria-label="LinkedIn"><i className="icon">🔗</i></a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Web Dev Quiz. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;