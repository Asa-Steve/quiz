import { useEffect } from "react";
import TimerProgress from "./ProgressBar";

const Footer = ({
  dispatch,
  isAnswered,
  answer,
  timeAllowed,
  isSubjectCompleted,
  totalTime,
}) => {
  const min = Math.floor(timeAllowed / 60); //timeAllowed is in sec (divided by 60 to get time in ---> minutes)
  const sec = timeAllowed % 60; //trying to get the remaining fraction of time left after getting the minutes above
  useEffect(() => {
    const intervalId = setInterval(() => {
      timeAllowed && dispatch({ type: "tick" });
    }, 1000);
    !timeAllowed && dispatch({ type: "finish" });

    return () => clearInterval(intervalId);
  }, [dispatch, timeAllowed]);

  function HandleFinish() {
    const confirm = window.confirm("Are you sure you want to finish exam?");
    if (!confirm) return;
    dispatch({ type: "finish" });
  }

  return (
    <footer>
      <TimerProgress
        percentage={(timeAllowed / totalTime) * 100}
        text={`${min} : ${sec}`}
        rad={40}
      />
      {/* <span className="timer">
        {min} : {sec}
      </span> */}
      {isAnswered && !isSubjectCompleted && (
        <div style={{ marginLeft: "auto", display: "flex", gap: "20px" }}>
          <button className="btn btn-ui next btn-finish" onClick={HandleFinish}>
            Finish
          </button>
          <button
            className="btn btn-ui next"
            onClick={() => dispatch({ type: "nextQuestion", payload: answer })}
          >
            Next
          </button>
        </div>
      )}
      {isSubjectCompleted && (
        <button
          className="btn btn-ui submit"
          onClick={() => dispatch({ type: "submitQuestion", payload: answer })}
        >
          Submit
        </button>
      )}
    </footer>
  );
};

export default Footer;
