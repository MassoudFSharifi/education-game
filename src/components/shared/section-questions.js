import React, { useState } from "react";

function SectionQuestions({
  setSectionLevel,
  setCurrentSection,
  questions,
  section,
  title,
}) {
  const [current, setCurrent] = useState(1);
  const [score, setScore] = useState(0);

  const questionsCount = questions?.length;

  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    if (current < questionsCount) {
      setCurrent(current + 1);
    } else {
      setSectionLevel("content");
      const finalScore = isCorrect ? score + 1 : score;
      if (finalScore > questionsCount / 2) {
        setCurrentSection((prev) => prev + 1);
        alert(
          `You got ${finalScore} from ${questionsCount}, You successfully passed section ${section}`
        );
      } else {
        alert(
          `You get ${finalScore} from ${questionsCount}, You should read section ${section} again `
        );
      }
    }
  };

  const currentQuestion = questions[current - 1];
  return (
    <div className="app">
      <h2>{title}</h2>
      <h2>Section {section} </h2>
      <p>Question {current}</p>

      <div>
        <p>{currentQuestion?.text}</p>
        {currentQuestion?.answers?.map((answer) => {
          return (
            <button onClick={() => handleAnswer(answer?.correct)}>
              {answer?.text}
            </button>
          );
        })}
      </div>

      <p>Score: {score}</p>
    </div>
  );
}

export default SectionQuestions;
