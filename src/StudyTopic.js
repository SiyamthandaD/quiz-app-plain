import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./StudyTopic.css";
import { ArrowLeft } from "lucide-react";

const StudyTopic = () => {
    const { topic } = useParams();
    const navigate = useNavigate();
    const [resources, setResources] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const formattedTopic = topic.charAt(0).toUpperCase() + topic.slice(1);

    useEffect(() => {
        const fetchResources = async () => {
            try {
                setIsLoading(true);
                setError(null);

                // W3Schools doesn't have an official public API, so we'll simulate it
                // with their existing resources structure
                const w3Resources = {
                    html: [
                        { type: "Tutorial", title: "HTML Tutorial", url: "https://www.w3schools.com/html/" },
                        {
                            type: "Documentation / Reference",
                            title: "HTML Tags",
                            url: "https://www.w3schools.com/tags/default.asp"
                        },
                        {
                            type: "Examples",
                            title: "HTML Examples",
                            url: "https://www.w3schools.com/html/html_examples.asp"
                        }
                    ],
                    css: [
                        { type: "Tutorial", title: "CSS Tutorial", url: "https://www.w3schools.com/css/" },
                        {
                            type: "Documentation / Reference",
                            title: "CSS Properties",
                            url: "https://www.w3schools.com/cssref/index.php"
                        },
                        {
                            type: "Examples",
                            title: "CSS Examples",
                            url: "https://www.w3schools.com/css/css_examples.asp"
                        }
                    ],
                    javascript: [
                        { type: "Tutorial", title: "JavaScript Tutorial", url: "https://www.w3schools.com/js/" },
                        {
                            type: "Documentation / Reference",
                            title: "JavaScript Reference",
                            url: "https://www.w3schools.com/jsref/default.asp"
                        },
                        {
                            type: "Examples",
                            title: "JavaScript Examples",
                            url: "https://www.w3schools.com/js/js_examples.asp"
                        }
                    ],
                    react: [
                        {
                            type: "Tutorial",
                            title: "React Tutorial",
                            url: "https://www.w3schools.com/REACT/DEFAULT.ASP"
                        },
                        {
                            type: "Youtube Link",
                            title: "React Course",
                            url: "https://www.youtube.com/watch?v=SqcY0GlETPk&pp=ygUacmVhY3QgY291cnNlIGZvciBiZWdpbm5lcnM%3D"
                        }
                    ],
                    python: [
                        { type: "Tutorial", title: "Python Tutorial", url: "https://www.w3schools.com/python/" },
                        {
                            type: "Reference",
                            title: "Python Reference",
                            url: "https://www.w3schools.com/python/python_reference.asp"
                        },
                        {
                            type: "Examples",
                            title: "Python Examples",
                            url: "https://www.w3schools.com/python/python_examples.asp"
                        }
                    ],
                    java: [
                        { type: "Tutorial", title: "Java Tutorial", url: "https://www.w3schools.com/java/" },
                        {
                            type: "Examples",
                            title: "Java Examples",
                            url: "https://www.w3schools.com/java/java_examples.asp"
                        }
                    ],
                    c_sharp: [
                        { type: "Tutorial", title: "C# Tutorial", url: "https://www.w3schools.com/cs/index.php" },
                        { type: "Examples", title: "C# Examples", url: "https://www.w3schools.com/cs/cs_examples.php" }
                    ],
                    c_plus_plus: [
                        { type: "Tutorials", title: "C++ Tutorial", url: "https://www.w3schools.com/cpp/default.asp" },
                        {
                            type: "Reference",
                            title: "C++ Reference",
                            url: "https://www.w3schools.com/cpp/cpp_ref_keywords.asp"
                        },
                        {
                            type: "Examples",
                            title: "C++ Examples",
                            url: "https://www.w3schools.com/cpp/cpp_examples.asp"
                        }
                    ],
                    "software development concepts": [
                        { type: "Tutorial", title: "Programming Concepts", url: "https://www.w3schools.com/whatis/" },
                        {
                            type: "Guide",
                            title: "Software Development",
                            url: "https://www.geeksforgeeks.org/software-engineering/software-development/"
                        },
                        {
                            type: "YouTube Link",
                            title: "SDLC Fundamentals",
                            url: "https://www.youtube.com/watch?v=SaCYkPD4_K0"
                        }
                    ]
                };

                // Simulate API delay
                await new Promise((resolve) => setTimeout(resolve, 500));

                const topicKey = topic.toLowerCase();
                if (w3Resources[topicKey]) {
                    setResources(w3Resources[topicKey]);
                } else {
                    setResources([
                        { type: "General", title: `${formattedTopic} Documentation`, url: "https://www.w3schools.com" },
                        {
                            type: "Search",
                            title: `Search W3Schools for ${formattedTopic}`,
                            url: `https://www.w3schools.com/search/default.asp?q=${topic}`
                        }
                    ]);
                }
            } catch (err) {
                setError("Failed to load resources. Please try again later.");
                console.error("Error fetching resources:", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchResources();
    }, [topic, formattedTopic]);

    return (
        <div className="study-topic-container">
            <button onClick={() => navigate("/study")} className="back-button">
                <ArrowLeft size={20} className="icon" />
                Back to Topics
            </button>

            <h1>{formattedTopic} Topics</h1>

            {isLoading ? (
                <div className="loading-message">Loading resources...</div>
            ) : error ? (
                <div className="error-message">{error}</div>
            ) : (
                <div className="resources-grid">
                    {resources.map((resource, index) => (
                        <a
                            key={index}
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="resource-card">
                            <div className="resource-type">{resource.type}</div>
                            <h3>{resource.title}</h3>
                            <p className="resource-url">{resource.url}</p>
                        </a>
                    ))}
                </div>
            )}
        </div>
    );
};

export default StudyTopic;
