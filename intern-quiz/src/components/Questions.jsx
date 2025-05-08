import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import questions from "../question.json";

const Questions = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [responses, setResponses] = useState({});
  const [timer, setTimer] = useState(10);
  const navigate = useNavigate();

  const q = questions[currentIndex];

  useEffect(() => {
    setTimer(10);
    const countdown = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) {
          clearInterval(countdown);
          handleNext();
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, [currentIndex]);

  const handleChange = (index, value) => {
    setResponses({ ...responses, [index]: value });
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      navigate("/result", { state: { responses, questions } });
    }
  };

  return (
    <div className="quiz-container">
      <h1 className="quiz-title">Cybersecurity Awareness Quiz</h1>

      <div className="timer-box">
        <p className="timer-text">Time Left: {timer}s</p>
      </div>

      <div className="question-box">
        <p className="question-text">{currentIndex + 1}. {q.question}</p>

        {q.options.length > 0 ? (
          <div className="options-container">
            {q.options.map((opt, i) => (
              <label key={i} className={`option-box ${responses[currentIndex] === opt ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name={`question-${currentIndex}`}
                  value={opt}
                  checked={responses[currentIndex] === opt}
                  onChange={() => handleChange(currentIndex, opt)}
                  className="radio-input"
                />
                {opt}
              </label>
            ))}
          </div>
        ) : (
          <textarea
            rows="3"
            className="text-area"
            placeholder="Type your answer here..."
            value={responses[currentIndex] || ''}
            onChange={(e) => handleChange(currentIndex, e.target.value)}
          />
        )}
      </div>

      <button className="next-btn" onClick={handleNext}>
        {currentIndex < questions.length - 1 ? "Next Question" : "Submit Quiz"}
      </button>

      <style>{`
         body {
          margin: 0;
          background: linear-gradient(135deg, #B32BEE, #00A69D);
          font-family: sans-serif;
          color: white;
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
        }

        .quiz-container {
          padding: 24px;
          background: transparent;
          min-height: 450px;
          width: 1000px;
          border-radius: 0;
          font-family: sans-serif;
          color: white;
        }

        .quiz-title {
          font-size: 28px;
          font-weight: bold;
          margin-bottom: 20px;
          text-align: center;
        }

        .timer {
          text-align: right;
          font-size: 18px;
          font-weight: bold;
          margin-bottom: 10px;
        }

        .timer-box {
          background-color: rgba(255, 255, 255, 0.15);
          padding: 10px 20px;
          border-radius: 8px;
          margin-bottom: 20px;
          display: inline-block;
          margin-left: 800px;
        }

        .timer-text {
          font-size: 18px;
          font-weight: bold;
        }

        .question-box {
          background: rgba(255, 255, 255, 0.1);
          padding: 20px;
          max-width: 700px;
          border-radius: 12px;
          margin-bottom: 20px;
          margin-left: 130px;
        }

        .question-text {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 16px;
        }

        .options-container {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .option-box {
          background-color: rgba(255, 255, 255, 0.15);
          padding: 10px 16px;
          border-radius: 8px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .option-box:hover {
          background-color: rgba(255, 255, 255, 0.25);
        }

        .option-box input[type="radio"] {
          margin-right: 10px;
        }

        .option-box.selected {
          background-color: rgba(0, 255, 255, 0.4);
          border: 1px solid white;
        }

        .text-area {
          width: 100%;
          padding: 10px;
          border-radius: 8px;
          border: none;
          font-size: 16px;
          margin-top: 12px;
        }

        .next-btn {
          background-color: #ffffff;
          color: #333;
          font-size: 16px;
          padding: 10px 24px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          justify-content: center;
          align-items: center;
          font-weight: bold;
          display: block;
          margin: 0 auto;
        }

        .next-btn:hover {
          background-color: #f0f0f0;
        }

        @media (max-width: 600px) {
          .quiz-container {
            padding: 16px;
          }

          .quiz-title {
            font-size: 22px;
          }
        }
      `}</style>
    </div>
  );
};

export default Questions;
