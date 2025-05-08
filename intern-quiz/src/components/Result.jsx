import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import {
    FacebookShareButton,
    TwitterShareButton,
    LinkedinShareButton,
    WhatsappShareButton,
    FacebookIcon,
    TwitterIcon,
    LinkedinIcon,
    WhatsappIcon,
  } from 'react-share';

ChartJS.register(ArcElement, Tooltip, Legend);

const Result = () => {
  const { state } = useLocation();
  const { responses, questions } = state;

  const [currentIndex, setCurrentIndex] = useState(0);

  const correctCount = questions.reduce((count, q, idx) => {
    return responses[idx] === q.correctAnswer ? count + 1 : count;
  }, 0);

  const incorrectCount = questions.length - correctCount;

  const q = questions[currentIndex];
  const userAnswer = responses[currentIndex];
  const isCorrect = userAnswer === q.correctAnswer;

  const chartData = {
    labels: ["Correct", "Incorrect"],
    datasets: [
      {
        data: [correctCount, incorrectCount],
        backgroundColor: ["#4CAF50", "#F44336"],
        hoverOffset: 4,
      },
    ],
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="result-container">
      <h1 className="result-title">Your Quiz Results</h1>

      <div className="carousel-container">
        <button onClick={handlePrev} className="nav-btn left-btn">
          &#8249;
        </button>

        <div className="carousel-box">
          <div className="question-box">
            <p className="question">{q.question}</p>
            <div className="answer-box">
              <p className="answer">
                Your Answer: <strong>{userAnswer || "No answer given"}</strong>
              </p>
              <p className="answer">
                Correct Answer: <strong>{q.correctAnswer || "N/A"}</strong>
              </p>
              <p className={`result ${isCorrect ? "correct" : "incorrect"}`}>
                {isCorrect ? "Correct" : "Incorrect"}
              </p>
            </div>
          </div>
        </div>

        <button onClick={handleNext} className="nav-btn right-btn">
          &#8250;
        </button>
      </div>

      <div className="score-circle">
        <p className="score-text">{correctCount} / {questions.length}</p>
        
      </div>

      <div className="chart-container">
      <Pie data={chartData} options={{
        plugins: {
            legend: {
            labels: {
                color: 'white',
                font: {
                size: 14,
                },
            },
            },
            tooltip: {
            bodyColor: 'white',
            titleColor: 'white',
            },
        },
        }} />

        <div className="share-column">
        <h3>Share your results</h3>
        <div className="social-buttons">
            <FacebookShareButton url={window.location.href} quote="Check out my quiz result!">
            <FacebookIcon size={40} round />
            </FacebookShareButton>

            <TwitterShareButton url={window.location.href} title="I just completed a cybersecurity quiz!">
            <TwitterIcon size={40} round />
            </TwitterShareButton>

            <LinkedinShareButton url={window.location.href}>
            <LinkedinIcon size={40} round />
            </LinkedinShareButton>

            <WhatsappShareButton url={window.location.href} title="Check this out!">
            <WhatsappIcon size={40} round />
            </WhatsappShareButton>
        </div>
        </div>

      </div>

      <style>{`
        body {
          margin: 0;
          fontFamily: "'Roboto', sans-serif";
          background: linear-gradient(135deg, #B32BEE, #00A69D);
          color: white;
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
        }

        .result-container {
          padding: 20px;
          max-width: 1000px;
          margin: 0 auto;
          text-align: center;
        }

        .result-title {
          font-size: 38px;
          font-weight: bold;
          margin-bottom: 20px;
        }

        .carousel-container {
          display: flex;
          justify-content: center;
          align-items: center;
          color: black;
        }

        .share-column {
        margin-top: 30px;
        text-align: center;
        }

        .social-buttons > * {
        margin: 0 10px;
        }


        .nav-btn {
          background-color: transparent;
          color: white;
          border: none;
          padding: 10px;
          font-size: 80px;
          cursor: pointer;
          border-radius: 50%;
          margin: 0 15px;
        }

        .carousel-box {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 300px;
          width: 1000px;
          background: rgba(0, 0, 0, 0.1);
          padding: 20px;
          border-radius: 12px;
        }

        .question-box {
          background: #f9f9f9;
          padding: 15px;
          font-size: 25px;
          height: 250px;
          border-radius: 8px;
          width: 1000px;
          text-align: left;
        }

        .question {
          font-weight: bold;
          margin-bottom: 10px;
        }

        .answer-box {
          font-size: 25px;
          margin-top: 10px;
        }

        .answer {
          font-size: 25px;
        }

        .result {
          font-weight: bold;
          margin-top: 10px;
        }

        .correct {
          color: green;
        }

        .incorrect {
          color: red;
        }

        .score-circle {
          margin-top: 30px;
          width: 100px;
          height: 100px;
          background: white;
          color: black;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 24px;
          font-weight: bold;
          margin-left: auto;
          margin-right: auto;
        }

        .chart-container {
          max-width: 300px;
          margin: 40px auto;
        }
      `}</style>
    </div>
  );
};

export default Result;
