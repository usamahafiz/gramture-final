import React, { useEffect, useState } from "react";
import "../../assets/css/homepage.css"; // Import the CSS file

const Home = () => {
  const [quote, setQuote] = useState("");

  const quotes = [
    "The beautiful thing about learning is that no one can take it away from you. – B.B. King",
    "Education is the most powerful weapon which you can use to change the world. – Nelson Mandela",
    "The roots of education are bitter, but the fruit is sweet. – Aristotle",
    "It does not matter how slowly you go as long as you do not stop. – Confucius",
    "Learning is a treasure that will follow its owner everywhere. – Chinese Proverb",
    "Success is the sum of small efforts, repeated day in and day out. – Robert Collier",
    "You are never too old to set another goal or to dream a new dream. – C.S. Lewis",
    "The only way to do great work is to love what you do. – Steve Jobs",
    "The future belongs to those who believe in the beauty of their dreams. – Eleanor Roosevelt",
    "Education is the key to unlock the golden door of freedom. – George Washington Carver",
    "Do not go where the path may lead, go instead where there is no path and leave a trail. – Ralph Waldo Emerson",
    "The expert in anything was once a beginner. – Helen Hayes",
    "Learning is not attained by chance, it must be sought for with ardor and diligence. – Abigail Adams",
    "Learning is a treasure that will follow its owner everywhere. – Chinese Proverb",
    "It always seems impossible until it’s done. – Nelson Mandela",
    "The more that you read, the more things you will know. The more that you learn, the more places you’ll go. – Dr. Seuss",
    "What we learn with pleasure we never forget. – Alfred Mercier",
    "It is not that I'm so smart. But I stay with the questions much longer. – Albert Einstein",
    "Knowledge is power. – Sir Francis Bacon",
    "You learn something every day if you pay attention. – Ray LeBlond",
    "You can never be overdressed or overeducated. – Oscar Wilde",
    "An investment in knowledge pays the best interest. – Benjamin Franklin",
    "Education is what remains after one has forgotten what one has learned in school. – Albert Einstein",
    "The best way to predict the future is to create it. – Peter Drucker",
    "Start where you are. Use what you have. Do what you can. – Arthur Ashe",
    "In the middle of difficulty lies opportunity. – Albert Einstein",
  ];

  useEffect(() => {
    // Set a random quote every time the page is loaded
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(randomQuote);
  }, []);

  return (
    <div className="app-container">
      {/* Header Section */}
      <header className="header-section">
        <div className="overlay">
          <div className="header-content">
            <h1>Gramture</h1>
            <p className="header-tagline">Grow and Lead</p>
            <p className="quote-text">{quote}</p>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Home;
