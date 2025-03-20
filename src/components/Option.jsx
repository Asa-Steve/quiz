const Option = ({
  dispatch,
  option,
  isAnswered,
  answer,
  idx,
  questions,
  index,
  
}) => {
  return (
    <button
      key={option}
      className={`btn btn-option ${
        isAnswered ? (answer === idx ? "answer" : "") : ""
      } ${
        isAnswered
          ? questions.at(index).correctOption === idx
            ? "correct"
            : "wrong"
          : ""
      }`}
      onClick={() => dispatch({ type: "submitAnswer", payload: idx })}
      disabled={isAnswered}
    >
      {option}
    </button>
  );
};

export default Option;
