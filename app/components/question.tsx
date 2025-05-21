'use client';

import { useState } from "react";
import styles from "../question.module.css";

type QuestionProps = {
  question: string;
  answers: string[];
  correctAnswer: string;
  onAnswered: (isCorrect: boolean, answer:string, correctAnswer: string) => void;
};

export default function Question({
  question,
  answers,
  correctAnswer,
  onAnswered,
}: QuestionProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const handleClick = (answer: string) => {
    if (selectedAnswer === null) {
      setSelectedAnswer(answer);
      const isCorrect = answer === correctAnswer;
      onAnswered(isCorrect, answer, correctAnswer); // Notify parent with result
    }
  };

  return (
    //Box shadow four corners
    <div className={styles.questionBox}>
      <h2 className={styles.questionText}>{question}</h2>
      <ul className={styles.answerList}>
        {answers.map((answer, index) => {
          const isSelected = selectedAnswer === answer;
          const isCorrect = answer === correctAnswer;

          let className = styles.answer;
          if (selectedAnswer) {
            if (isCorrect) {
              className += ` ${styles.correct}`;
            } else if (isSelected) {
              className += ` ${styles.incorrect}`;
            }
          }

          return (
            <li
              key={index}
              onClick={() => handleClick(answer)}
              className={className}>
              {answer}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
