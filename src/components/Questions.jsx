import { useEffect } from "react";
import Loader from "./Loader";
import Option from "./Option";
import Footer from "./Footer";

const Questions = ({
  dispatch,
  status,
  questions,
  index,
  answer,
  points,
  timeAllowed,
  selectedSubjects,
  currSubject,
  isSubjectCompleted,
}) => {
  const isAnswered = answer !== null;
  const numOfQuest = questions.length;
  const totalPoints = questions.reduce((acc, curr) => acc + curr.points, 0);

  useEffect(() => {
    fetch("http://localhost:5000/questions")
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: "active", payload: data });
      })
      .catch((err) => console.log(err));
  }, [dispatch]);

  return status === "loading" ? (
    <Loader />
  ) : (
    <div className="question">
      <div className="quiz_courses">
        {selectedSubjects.map((subject, i) => (
          <button
            className={currSubject === i ? "active" : ""}
            onClick={() =>
              dispatch({ type: "switchSubject", payload: subject })
            }
            key={subject}
            disabled={
              (index < questions.length - 1 && answer !== null) ||
              isSubjectCompleted
              // (isSubjectCompleted && currSubject === i)
            }
          >
            {subject}
          </button>
        ))}
      </div>

      <div className="progress">
        <progress max={numOfQuest} value={index + Number(answer)} />
      </div>
      <div className="stat">
        <span>
          Question <strong>{index + 1}</strong>/{numOfQuest}
        </span>

        <span>
          <strong>{points}</strong>/{totalPoints} Points
        </span>
      </div>
      <h4>{questions.at(index).question}</h4>

      <div className="options">
        {questions.at(index).options.map((option, idx) => (
          <Option
            dispatch={dispatch}
            option={option}
            isAnswered={isAnswered}
            answer={answer}
            idx={idx}
            questions={questions}
            index={index}
            key={option}
          />
        ))}
      </div>

      <Footer
        dispatch={dispatch}
        isAnswered={isAnswered}
        answer={answer}
        timeAllowed={timeAllowed}
        index={index}
        questions={questions}
        isSubjectCompleted={isSubjectCompleted}
      />
    </div>
  );
};

export default Questions;
