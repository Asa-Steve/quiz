import { useQuiz } from "../Context/QuizProvider";

const Option = ({ option, idx }) => {
  const { dispatch, questions, index, answer } = useQuiz();
  const isAnswered = answer !== null;

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
