import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, message, Spin } from "antd";
import { getDocs, collection } from "firebase/firestore";
import { fireStore } from "../firebase/firebase";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  FaReply,
  FaShareAlt,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import "../assets/css/description.css";
import CommentSection from "./CommentSection";
import ShareArticle from "./ShareArticle";

export default function Description() {
  const { subCategory, topicId } = useParams();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mcqs, setMcqs] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState({});
  const [answerFeedback, setAnswerFeedback] = useState({});
  const [currentMcqIndex, setCurrentMcqIndex] = useState(0);
  const [completedMcqs, setCompletedMcqs] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [allTopics, setAllTopics] = useState([]);
  const [currentTopicIndex, setCurrentTopicIndex] = useState(null);

  useEffect(() => {
    fetchProducts();
    fetchAllTopics();
  }, [subCategory, topicId]);

  const fetchProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(fireStore, "topics"));
      const productList = querySnapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter(
          (product) =>
            product.subCategory === subCategory && product.id === topicId
        );
      setProducts(productList);
      setMcqs(productList[0]?.mcqs || []);
      setLoading(false);
    } catch (error) {
      message.error("Failed to fetch products.");
      console.error(error);
    }
  };

  const fetchAllTopics = async () => {
    try {
      const querySnapshot = await getDocs(collection(fireStore, "topics"));
      const topicsList = querySnapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter((topic) => topic.subCategory === subCategory)
        .sort((a, b) => a.timestamp - b.timestamp);

      setAllTopics(topicsList);

      const currentTopicIdx = topicsList.findIndex(
        (topic) => topic.id === topicId
      );
      setCurrentTopicIndex(currentTopicIdx);
    } catch (error) {
      message.error("Failed to fetch topics.");
      console.error(error);
    }
  };

  const navigateToTopic = (direction) => {
    if (currentTopicIndex !== null) {
      const newTopicIndex = currentTopicIndex + direction;
      if (newTopicIndex >= 0 && newTopicIndex < allTopics.length) {
        const newTopicId = allTopics[newTopicIndex].id;
        navigate(`/description/${subCategory}/${newTopicId}`);
        
        // Scroll to the top of the page after navigation
        window.scrollTo(0, 0);
      }
    }
  };

  const handleAnswerChange = (event) => {
    const { value } = event.target;
    setSelectedAnswer({
      ...selectedAnswer,
      [currentMcqIndex]: value,
    });
  };

  const handleNextQuestion = () => {
    const currentMcq = mcqs[currentMcqIndex];
    const selected = selectedAnswer[currentMcqIndex];

    if (selected === undefined) {
      message.error("Please select an answer before moving to the next question.");
      return;
    }

    // Check answer and give feedback
    const feedback = selected === currentMcq.correctAnswer ? "Correct!" : "Incorrect.";
    setAnswerFeedback({
      ...answerFeedback,
      [currentMcqIndex]: feedback,
    });

    // Move to the next question
    if (currentMcqIndex + 1 < mcqs.length) {
      setCurrentMcqIndex(currentMcqIndex + 1);
    } else {
      // Show results when all questions are answered
      setShowResults(true);
    }
  };

  const calculateResults = () => {
    let correctAnswers = 0;
    mcqs.forEach((mcq, index) => {
      if (selectedAnswer[index] === mcq.correctAnswer) {
        correctAnswers++;
      }
    });
    return correctAnswers;
  };

  const handleReviewClick = (index) => {
    setCurrentMcqIndex(index);
  };

  const handleRetakeTest = () => {
    setSelectedAnswer({});
    setAnswerFeedback({});
    setCurrentMcqIndex(0);
    setCompletedMcqs([]);
    setShowResults(false);
  };
  const getNextTopic = () => {
    if (currentTopicIndex === null || currentTopicIndex + 1 >= allTopics.length) return null;
    return allTopics[currentTopicIndex + 1];
  };

  const getPrevTopic = () => {
    if (currentTopicIndex === null || currentTopicIndex - 1 < 0) return null;
    return allTopics[currentTopicIndex - 1];
  };


  return (
    <div className="description-container">
      {loading && (
        <div className="loader-overlay">
          <Spin size="large" />
        </div>
      )}
      {products.length > 0 && (
        <>
          {/* <h3 className="page-title">{subCategory}</h3> */}
          <h1
          style={{ fontSize: "2rem", fontWeight: "bold", marginLeft: "10px" , textAlign: "center",}}
          >{products[0].topic}</h1>
          {products.map((product) => (
            <article key={product.id} className="product-article">
              <div className="product-description">
                <div
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
              </div>
            </article>
          ))}

          <p style={{ fontSize: "1.1rem", marginLeft: "10px" }}>  
          Gramture is an Educational website that helps students in their 9th, 10th, 1st year, and 2nd year with their studies. It provides notes, essays, applications, letters, short stories, chapter summaries, and word meanings in easy wording. This website to prepare for exams and improve their English grammar. Gramture makes learning simple and helps students understand subjects better.

          </p>

          {/* MCQ Section (Only Show if MCQs Exist) */}
          {mcqs.length > 0 && (
            <div className="mcq-section">
              {showResults ? (
                <div className="result-summary">
                  <h3>Your Results</h3>
                  <p>{`You answered ${calculateResults()} out of ${mcqs.length} questions correctly.`}</p>
                  <h4>Review Your Answers:</h4>
                  {mcqs.map((mcq, index) => (
                    <div
                      key={index}
                      className={`review-item ${
                        selectedAnswer[index] === mcq.correctAnswer ? "correct" : "incorrect"
                      }`}
                    >
                      <p>{mcq.question}</p>
                      <p>Your answer: {selectedAnswer[index]}</p>
                      <p>Correct answer: {mcq.correctAnswer}</p>
                    </div>
                  ))}
                  <button
                    onClick={handleRetakeTest}
                    style={{
                      padding: "10px 20px",
                      fontSize: "16px",
                      backgroundColor: "#FF9800",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                      transition: "background-color 0.3s ease",
                    }}
                  >
                    Retake Test
                  </button>
                </div>
              ) : (
                <>
                  <h4>Question {currentMcqIndex + 1} of {mcqs.length}</h4>
                  <div className="mcq-item">
                    <h4>{mcqs[currentMcqIndex]?.question}</h4>
                    <div className="mcq-options">
                      {mcqs[currentMcqIndex]?.options.map((option, index) => (
                        <label key={index} className="mcq-option">
                          <input
                            type="radio"
                            name={`mcq-${currentMcqIndex}`}
                            value={option}
                            checked={selectedAnswer[currentMcqIndex] === option}
                            onChange={handleAnswerChange}
                          />
                          {option}
                        </label>
                      ))}
                    </div>
                    {answerFeedback[currentMcqIndex] && (
                      <p className={answerFeedback[currentMcqIndex] === "Correct!" ? "correct" : "incorrect"}>
                        {answerFeedback[currentMcqIndex]}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={handleNextQuestion}
                    style={{
                      padding: "10px 20px",
                      fontSize: "16px",
                      backgroundColor: "#4CAF50",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                      transition: "background-color 0.3s ease",
                    }}
                  >
                    {currentMcqIndex + 1 === mcqs.length ? "Finish" : "Next Question"}
                  </button>
                </>
              )}
            </div>
          )}
          <ShareArticle />
          {/* Navigation for Next and Previous Topics */}
          <div className="topic-navigation">
            {getPrevTopic() && getPrevTopic().subCategory === subCategory && getPrevTopic().class === products[0].class && (
             <Link 
             to={`/description/${subCategory}/${getPrevTopic().id}`} 
             className="prev-button"
             style={{
               display: 'flex',
               alignItems: 'center',
               marginBottom: '20px',
               fontSize: '18px',
               fontWeight: 'bold',
               textDecoration: 'none',
               color: '#0073e6',
             }}
           >
             <FaChevronLeft className="nav-icon" /> Previous Topic: {getPrevTopic().topic}
           </Link>
           
            )}

            {getNextTopic() && getNextTopic().subCategory === subCategory && getNextTopic().class === products[0].class && (
              <Link 
              to={`/description/${subCategory}/${getNextTopic().id}`} 
              className="next-button"
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '20px',
                fontSize: '18px',
                fontWeight: 'bold',
                textDecoration: 'none',
                color: '#0073e6',
              }}
            >
              Next Topic: {getNextTopic().topic} <FaChevronRight className="nav-icon" />
            </Link>
            
            )}
          </div>

          

          {/* Comment Section */}
          <CommentSection subCategory={subCategory} topicId={topicId} />
        </>
      )}
    </div>
  );
}
