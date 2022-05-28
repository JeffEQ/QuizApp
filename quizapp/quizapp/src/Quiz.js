import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getToken, setToken } from "./auth";
import "./Quiz.css";

function Quiz() {
  // questions
  const questions = [
    {
      text: "What is the stock symbol for McDonald's Corp?",
      options: [
        { id: 0, text: "MCLD", isCorrect: false },
        { id: 1, text: "MCDO", isCorrect: false },
        { id: 2, text: "MCD", isCorrect: true },
      ],
    },
    {
      text: "What is the stock symbol for Chevron Corp?",
      options: [
        { id: 0, text: "CVX", isCorrect: true },
        { id: 1, text: "CHV", isCorrect: false },
        { id: 2, text: "CHEV", isCorrect: false },
      ],
    },
    {
      text: "CRM is the stock symbol for?",
      options: [
        { id: 0, text: "Canara Management", isCorrect: false },
        { id: 1, text: "Salesforce", isCorrect: true },
        { id: 2, text: "CR Brands", isCorrect: false },
      ],
    },
    {
      text: "What is the stock symbol for Walt Disney Co?",
      options: [
        { id: 0, text: "WDC", isCorrect: false },
        { id: 1, text: "DIS", isCorrect: true },
        { id: 2, text: "WALD", isCorrect: false },
      ],
    },
    {
      text: "What is the stock symbol for American Express Co?",
      options: [
        { id: 0, text: "AXP", isCorrect: true },
        { id: 1, text: "AMEX", isCorrect: false },
        { id: 2, text: "AMEC", isCorrect: false },
      ],
    },
    {
      text: "What is the stock symbol for Microsoft Corp?",
      options: [
        { id: 0, text: "MICR", isCorrect: false },
        { id: 1, text: "MCFT", isCorrect: false },
        { id: 2, text: "MSFT", isCorrect: true },
      ],
    },
    {
      text: "What is the stock symbol for Netflix, Inc.?",
      options: [
        { id: 0, text: "NETF", isCorrect: false },
        { id: 1, text: "NFLX", isCorrect: true },
        { id: 2, text: "NFIX", isCorrect: false },
      ],
    },
    {
      text: "What is the stock symbol for McDonald's Corp?",
      options: [
        { id: 0, text: "MCLD", isCorrect: false },
        { id: 1, text: "MCDO", isCorrect: false },
        { id: 2, text: "MCD", isCorrect: true },
      ],
    },
    {
      text: "LUV is the stock symbol for?",
      options: [
        { id: 0, text: "Luvell Industries", isCorrect: false },
        { id: 1, text: "Southwest Airlines", isCorrect: true },
        { id: 2, text: "The Lovett Group", isCorrect: false },
      ],
    },
    {
      text: "What is the stock symbol for Apple Inc?",
      options: [
        { id: 0, text: "AAPL", isCorrect: true },
        { id: 1, text: "APPL", isCorrect: false },
        { id: 2, text: "APLE", isCorrect: false },
      ],
    },
  ];
  let user = getToken();
  let navigate = useNavigate();

  // Set initial states
  const [showFinalScore, setFinalScore] = useState(false);
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  // Functions for after user clicks answer
  const optionClicked = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setFinalScore(true);
    }
  };

  // Play again function
  const playAgain = () => {
    setScore(0);
    setCurrentQuestion(0);
    setFinalScore(false);
    navigate("/");
  };

  useEffect(() => {
    fetch("http://localhost:4000/name/editscore", {
      method: "POST",
      body: JSON.stringify({ id: user._id, score}),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          setToken("user", res.data);
        } else {
          navigate("/");
        }
      })
      .catch((err) => console.log(err));
  }, [score]);

  // return APP

  return (
    <div className="App">
      <h1>Stock Symbol Quiz</h1>

      <h2>Current Score: {score}</h2>

      {/* Display Final Score */}
      {showFinalScore ? (
        <div className="results">
          <h1> Your Result:</h1>
          <h2>
            Great job, {user.name}. You scored {(score / questions.length) * 100}%
          </h2>
          <button onClick={() => playAgain()}>Play Again</button>
        </div>
      ) : (
        <div className="questionbox">
          {/* Display questions and answers */}
          <h2>
            Question {currentQuestion + 1} out of {questions.length}
          </h2>
          <h3 className="questiontext">{questions[currentQuestion].text}</h3>
          <ul>
            {questions[currentQuestion].options.map((option) => {
              return (
                <li
                  onClick={() => optionClicked(option.isCorrect)}
                  key={option.id}
                >
                  {option.text}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Quiz;
