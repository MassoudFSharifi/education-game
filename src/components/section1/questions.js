import SectionQuestions from "../shared/section-questions";

const questions = [
  {
    text: "What year was React formally open-sourced by Facebook?",
    answers: [
      {
        text: "A. 2013",
        correct: true,
      },
      {
        text: "B. 2011",
        correct: false,
      },
    ],
  },
  {
    text: "What core feature of React allows developers to build reusable UI components and enhance maintainability?",
    answers: [
      {
        text: "A. Virtual DOM",
        correct: false,
      },
      {
        text: "B. Component-based architecture",
        correct: true,
      },
    ],
  },
  {
    text: "What advantage of React significantly enhances the performance of web applications by minimizing direct DOM manipulations?",
    answers: [
      {
        text: "A. Speed and efficiency",
        correct: true,
      },
      {
        text: "B. Declarative syntax",
        correct: false,
      },
    ],
  },
  {
    text: "What type of data flow does React employ, where data is passed from parent components to child components via props?",
    answers: [
      {
        text: "A. One-way data flow",
        correct: true,
      },
      {
        text: "B. Bidirectional data flow",
        correct: false,
      },
    ],
  },
];

function FirstSectionQuestions({ setSectionLevel, setCurrentSection }) {
  return (
    <SectionQuestions
      setCurrentSection={setCurrentSection}
      setSectionLevel={setSectionLevel}
      section="one"
      questions={questions}
      title="To Go to Section Two you should answer 3 questions from 4 questions"
    />
  );
}

export default FirstSectionQuestions;
