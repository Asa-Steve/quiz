import React from "react";
import ProgressBar from "./ProgressBar";

const FinishScreen = ({ dispatch, points, questions, totalAnswered }) => {
  const totalPoints = questions.reduce((acc, curr) => acc + curr.points, 0);
  const percentage = Math.floor((points / totalPoints) * 100);
  const totalAttempt = totalAnswered;

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
                text={points}
                rad={50}
                size={30}
              />
            </span>
            <span>
              Points Gained ( {points}/ {totalPoints})
            </span>
          </div>
          <div>
            <span>
              <ProgressBar percentage={percentage} rad={50} size={30} />
            </span>
            <span> Percentage ( {percentage} / 100 %)</span>
          </div>
          <div>
            <span>
              <ProgressBar
                percentage={(totalAttempt/questions.length)*100}
                text={totalAnswered }
                rad={50}
                size={30}
              />
            </span>
            <span>
              Attempted ( {totalAttempt} / {questions.length})
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
