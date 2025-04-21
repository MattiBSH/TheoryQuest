import { useEffect, useState } from "react";
import styles from "../page.module.css";
import {QuestionType} from "../types/questionType";
import PieChart from "../PieChart";
import Question from "./question";


export default function ControlQuestion() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showNext, setShowNext] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [count, setCount] = useState(0);
  const [remainingQuestions, setRemainingQuestions] = useState<QuestionType[]>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<QuestionType>();
  interface ReviewData {
    question: string;
    answered: string;
    correct: string;
  }

  const [dataForReview, setDataForReview] = useState<ReviewData[]>([]);

  useEffect(() => {
    console.log("Correct count updated:", correctCount);
  }, [correctCount]);
  
  useEffect(() => {
    console.log("Incorrect count updated:", incorrectCount);
  }, [incorrectCount]);
  
  useEffect(() => {
    console.log("Total count updated:", count);
  }, [count]);

  useEffect(() => {
    console.log("Data for review updated:", dataForReview);
  }, [dataForReview]);

  useEffect(() => {
    console.log("Remaining questions updated:", remainingQuestions);
  }, [remainingQuestions]);

  useEffect(() => {
    console.log("Current question updated:", currentQuestion);
  }, [currentQuestion]);

  useEffect(() => {
    console.log("Current index updated:", currentIndex);
  }, [currentIndex]);

  useEffect(() => {
    // Fetch questions from our API endpoint
    loadQuestions();

    
  }, []);
  
  function loadQuestions() {
    fetch('/api/convert')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data: QuestionType[]) => {
        if (data.length === 0) {
          setError("No questions available.");
          setLoading(false);
          return;
        }

        // Shuffle answers inside each question, if needed
        const shuffledData = data.map((item) => ({
          ...item,
          answers: item.answers.sort(() => Math.random() - 0.5) // Example shuffle
        }));

        setCurrentIndex(Math.floor(Math.random() * shuffledData.length)); // Randomize the starting question

        setRemainingQuestions(shuffledData);
        setCurrentQuestion(shuffledData[currentIndex]); // Safe: using local data
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }

  const handleAnswered = (
    isCorrect: boolean,
    answered: string,
    correct: string
  ) => {
    setShowNext(true);

    if (remainingQuestions==null || remainingQuestions.length==0) return; // Prevent action if loading

    setDataForReview((dataForReview) => [
      ...dataForReview,
      { question: remainingQuestions[currentIndex].question, answered, correct },
    ]);

    if (isCorrect) {
      setCount((prev) => prev + 1);
      setCorrectCount(correctCount + 1);
    } else {
      setCount((prev) => prev + 1);
      setIncorrectCount(incorrectCount + 1);
    }
    console.log("Correct count:", correctCount);
    console.log("Incorrect count:", incorrectCount);
    console.log("Count:", count);
    console.log("Answered:", answered);
    console.log("Correct:", correct);
  };

  const handleNext = () => {
    if (remainingQuestions==null || remainingQuestions.length==0) return; // Prevent action if loading

    const updatedQuestions = [...remainingQuestions];
    updatedQuestions.splice(currentIndex, 1);

    setRemainingQuestions(updatedQuestions);
    const nextIndex = Math.floor(Math.random() * updatedQuestions.length);

    setCurrentIndex(nextIndex);
    setCurrentQuestion(remainingQuestions[currentIndex]); // Safe: using local data

    setShowNext(false);
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setShowNext(false);
    setCorrectCount(0);
    setIncorrectCount(0);
    setCount(0);
    setDataForReview([]);
    setRemainingQuestions([]);
    setLoading(true);
    setError(null);
    setCurrentQuestion(undefined);
    loadQuestions(); // Reload questions
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {count <= 9 ? (
          <>
            <div className={styles.questionContainer}>
              {                loading && <p>Loading questions...</p>}
              {error && <p>{error}</p>}
              {currentQuestion && (
              <Question
                key={currentQuestion.question}
                question={currentQuestion.question}
                answers={currentQuestion.answers}
                correctAnswer={currentQuestion.correctAnswer}
                onAnswered={handleAnswered}
              />)}
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
                    Næste
                  </button>
                  {currentQuestion && (
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
                      transition: "opacity 0.5s ease", // Smooth transition for appearance
                    }}
                  >
                    <p className="infoText"
                      style={{
                        visibility: currentQuestion.info ? "visible" : "hidden", // Make text visible or hidden
                        
                      }}
                    >
                      {currentQuestion.info || "‎"}{" "}
                      {/* Fallback for empty info */}
                    </p>
                  </div>
                  )}
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
                    <div style={{scale: "0.9"}}>
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
            <button className={styles.nextButton} onClick={()=>{handleRestart()}}>Prøv igen</button>
          </div>
        )}
      </main>
    </div>
  );
}
