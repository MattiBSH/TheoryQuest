"use client";

import { useState } from "react";
import styles from "./page.module.css";
import Question from "./question";
import PieChart from "./PieChart";
import { questions } from "./questions";

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showNext, setShowNext] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [count, setCount] = useState(0);
  const [remainingQuestions, setRemainingQuestions] = useState(questions);

  const handleAnswered = (isCorrect: boolean) => {
    setShowNext(true);
    console.log("isCorrect", isCorrect);
    console.log("currentIndex", currentIndex);
    console.log("questions", questions);
    console.log("questions.length", questions.length);
    console.log("count", count);

    if (isCorrect) {
      setCount((prev) => prev + 1);
      setCorrectCount((prev) => prev + 1);
    } else {
      setCount((prev) => prev + 1);
      setIncorrectCount((prev) => prev + 1);
    }
  };
const handleNext = () => {
  const updatedQuestions = [...remainingQuestions];
  updatedQuestions.splice(currentIndex, 1);

  if (updatedQuestions.length > 0) {
    const nextIndex = Math.floor(Math.random() * updatedQuestions.length);
    setCurrentIndex(nextIndex);
  }

  setRemainingQuestions(updatedQuestions);
  setShowNext(false);
};

const currentQuestion = remainingQuestions[currentIndex];

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {count <= 9 ? (
          <>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width:"500px"}}>
            <Question
              key={currentQuestion.question}
              question={currentQuestion.question}
              answers={currentQuestion.answers}
              correctAnswer={currentQuestion.correctAnswer}
              onAnswered={handleAnswered}
            />
            {showNext && (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "100px", gap: "0.5rem" }}>
    
    <button className={styles.nextButton} onClick={handleNext}>
      Next
    </button>
    
    <div
      style={{
        backgroundColor: "#cef5ff",
        borderRadius: "10px",
        padding: "8px",
        width: "200px",
        marginTop: "20px",
        minHeight: "40px", // reserve vertical space
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        opacity: currentQuestion.info ? 1 : 0, // Fade in/out
        transition: "opacity 0.3s ease", // Smooth transition for appearance
      }}
    >
      <p
        style={{
          visibility: currentQuestion.info ? "visible" : "hidden", // Make text visible or hidden
          minHeight: "2em", // Ensure some minimum space
          textAlign: "center",
          maxWidth: "400px",
          margin: 0, // Remove any extra margin
        }}
      >
        {currentQuestion.info || "‎"} {/* Fallback for empty info */}
      </p>
    </div>
  </div>
)}

            </div>
          </>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "20px" }}>
            <h2>Quiz completed! 🎉</h2>
            <p style={{ margin: "8px" }}>
              You answered {correctCount} out of {count} questions correctly.
            </p>
        
            <div style={{ width: "200px", marginBottom: "20px" }}>
              <PieChart correct={correctCount} incorrect={incorrectCount} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
