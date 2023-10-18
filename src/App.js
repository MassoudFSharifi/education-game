import { useState, useMemo } from "react";
import "./App.css";
import FirstSectionContent from "./components/section1/content";
import FirstSectionQuestions from "./components/section1/questions";
import SecondSectionContent from "./components/section2/content";

function App() {
  const [currentSection, setCurrentSection] = useState(1);
  const [sectionLevel, setSectionLevel] = useState("content");

  const handleShowCurrentSectionQuestions = () => {
    setSectionLevel("questions");
  };

  const sections = useMemo(
    () => [
      {
        content: FirstSectionContent,
        questions: FirstSectionQuestions,
      },
      {
        content: SecondSectionContent,
      },
    ],
    []
  );

  const CurrentSection = sections[currentSection - 1]?.[sectionLevel];
  return (
    <div
      className="App"
      style={{
        display: "flex",
        alignItems: "center",
        width: "vw",
        flexDirection: "column",
      }}
    >
      <CurrentSection
        setCurrentSection={setCurrentSection}
        setSectionLevel={setSectionLevel}
      />
      {sectionLevel === "content" && currentSection < 2 && (
        <button
          style={{
            marginBottom: "24px",
            cursor: "pointer",
            height: "40px",
            width: "190px",
          }}
          onClick={handleShowCurrentSectionQuestions}
        >
          Continue to Section {currentSection + 1}
        </button>
      )}
    </div>
  );
}

export default App;
