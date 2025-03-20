import React from "react";
import ProgressBar from "./ProgressBar";

const FinishScreen = ({
  dispatch,
  // points,
  // questions,
  // totalAnswered,
  subjectProgress,
}) => {
  let totalPoints = 0;
  let totalAnswered = 0;
  let totalQuestions = 0;
  let totalMaxPoints = 0;

  for (const [_, subjDetails] of Object.entries(subjectProgress)) {
    totalPoints += subjDetails.points;
    totalMaxPoints += subjDetails.maxPoints;
    totalAnswered += subjDetails.totalAnswered;
    totalQuestions += subjDetails.totalQuestions;
  }

  // console.log(subjectProgress);

  const percentage = Math.floor((totalPoints / totalMaxPoints) * 100);
  const percentageQuestion = Math.floor((totalAnswered / totalQuestions) * 100);
  const totalAttempt = totalAnswered;

  // console.log(
  //   "totalPoints:",
  //   totalPoints,
  //   "totalMaxPoints :",
  //   totalMaxPoints,
  //   "totalAnswered: ",
  //   totalAnswered
  // );

  return (
    <>
      <div className="finish">
        <div className="result">
          Congratulations on completing this Quiz!
          <br />
          You did great 🎉
        </div>
        <div className="final_stats">
          <div>
            <span>
              <ProgressBar
                percentage={percentage}
                text={totalPoints}
                rad={50}
                size={30}
              />
            </span>
            <span>
              Points Gained ( {totalPoints}/ {totalMaxPoints})
            </span>
          </div>
          <div>
            <span>
              <ProgressBar
                percentage={100 - percentage}
                rad={50}
                color="red"
                size={30}
                text={totalMaxPoints - totalPoints}
              />
            </span>
            <span>
              {" "}
              Points Lost ( {totalMaxPoints - totalPoints} / {totalMaxPoints})
            </span>
          </div>
          <div>
            <span>
              <ProgressBar
                percentage={percentageQuestion}
                text={totalAnswered}
                rad={50}
                size={30}
              />
            </span>
            <span>
              Attempted ( {totalAttempt} / {totalQuestions})
            </span>
          </div>
        </div>
      </div>
      <div className="retake">
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "retake" })}
        >
          Retake
        </button>
      </div>
    </>
  );
};

export default FinishScreen;
