import { useEffect, useState } from "react";
import TimerProgress from "./ProgressBar";

const Footer = ({
  dispatch,
  isAnswered,
  answer,
  timeAllowed,
  index,
  questions,
  isSubjectCompleted,
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

  return (
    <footer>
      <TimerProgress percentage={timeAllowed * 10} />
      <span className="timer">
        {min} : {sec}
      </span>
      {isAnswered && !isSubjectCompleted && (
        <button
          className="btn btn-ui next"
          onClick={() => dispatch({ type: "nextQuestion", payload: answer })}
        >
          Next
        </button>
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
