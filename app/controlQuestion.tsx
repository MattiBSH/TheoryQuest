import { useState } from "react";
import styles from "./page.module.css";
import Question from "./question";
import PieChart from "./PieChart";
import { questions } from "./data/questions";

export default function ControlQuestion() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showNext, setShowNext] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [count, setCount] = useState(0);
  const [remainingQuestions, setRemainingQuestions] = useState(questions);

  interface ReviewData {
    question: string;
    answered: string;
    correct: string;
  }

  const [dataForReview, setDataForReview] = useState<ReviewData[]>([]);

  const handleAnswered = (
    isCorrect: boolean,
    answered: string,
    correct: string
  ) => {
    setShowNext(true);
    console.log("isCorrect", isCorrect);
    console.log("currentIndex", currentIndex);
    console.log("questions", questions);
    console.log("questions.length", questions.length);
    console.log("count", count);

    setDataForReview((dataForReview) => [
      ...dataForReview,
      { question: questions[currentIndex].question, answered, correct },
    ]);

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

  const isAnyIncorrect = dataForReview.some(
    (item) => item.answered !== item.correct
  );

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {count <= 9 ? (
          <>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "500px",
              }}
            >
              <Question
                key={currentQuestion.question}
                question={currentQuestion.question}
                answers={currentQuestion.answers}
                correctAnswer={currentQuestion.correctAnswer}
                onAnswered={handleAnswered}
              />
              {showNext && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    minHeight: "100px",
                    gap: "0.5rem",
                  }}
                >
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
                      {currentQuestion.info || "‎"}{" "}
                      {/* Fallback for empty info */}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              padding: "20px",
            }}
          >
            <h2>Quiz completed! 🎉</h2>
            <p style={{ margin: "8px" }}>
              You answered {correctCount} out of {count} questions correctly.
            </p>

            <div style={{ width: "200px", marginBottom: "20px" }}>
              <PieChart correct={correctCount} incorrect={incorrectCount} />
            </div>
            {dataForReview.some((item) => item.answered !== item.correct) && (
            <h3 >Questions for Review</h3>)}
            <ul style={{ listStyleType: "none", padding: 0 }}>
              {dataForReview.map((item, index) => (
                <li key={index} style={{ margin: "8px 0" }}>
                  {item.answered !== item.correct && (
                    <div>
                       <span style={{ color: "red" }}>
                        (Dit svar var forkert)
                        <br />
                      </span>
                      <strong>Spørgsmål:</strong> {item.question} <br />
                      <strong>Dit svar: </strong> {item.answered} <br />
                      <strong>Det rigtige svar: </strong> {item.correct}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>
    </div>
  );
}
