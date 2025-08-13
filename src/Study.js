import React from "react";
import "./Study.css";
import { Code, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Study = () => {
    const navigate = useNavigate();

    const topics = [
        "HTML",
        "CSS",
        "JavaScript",
        "React",
        "Python",
        "Java",
        "C_sharp",
        "C_plus_plus",
        "Software Development Concepts"
    ];

    const handleTopicSelect = (topic) => {
        navigate(`/study/${topic.toLowerCase()}`);
    };

    return (
        <div className="study-container">
            <h1>Study Resources</h1>
            <p className="study-intro">
                Select a topic to explore study materials and resources to improve your knowledge.
            </p>

            <div className="topics-list">
                {topics.map((topic, index) => (
                    <div key={index} className="topic-card" onClick={() => handleTopicSelect(topic)}>
                        <div className="topic-info">
                            <Code size={20} className="topic-icon" />
                            <h3>{topic}</h3>
                        </div>
                        <ChevronRight size={20} className="chevron-icon" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Study;
