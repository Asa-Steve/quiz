import { useState } from "react";
import { useQuiz } from "../Context/QuizProvider";

const Setup = () => {
  const { dispatch, selectedSubjects } = useQuiz();

  const subj = ["English", "Mathematics", "Biology", "Physics", "Chemistry"];
  const numSubject = selectedSubjects.length;
  const [num, setNum] = useState("");

  return (
    <div className="setup">
      <h3>Select at most four ( 4 ) subjects</h3>

      <div className="course_select">
        {subj.map((subject) => (
          <div
            key={subject}
            onClick={() =>
              dispatch({ type: "selectSubject", payload: subject })
            }
          >
            <span className="check">
              {selectedSubjects.find((e) => e === subject) && "✅"}
            </span>
            {subject}
          </div>
        ))}
      </div>
      <div className="ques_no">
        <p>Enter num of questions</p>
        <input
          type="number"
          value={num || ""}
          max={50}
          min={1}
          onChange={(e) => setNum(+e.target.value)}
        />
      </div>

      <div className="proceed">
        {numSubject >= 1 && numSubject <= 4 && num > 0 && num < 51 && (
          <button
            className="btn btn-ui"
            onClick={() => dispatch({ type: "start", payload: num })}
          >
            Proceed
          </button>
        )}
      </div>
    </div>
  );
};

export default Setup;
