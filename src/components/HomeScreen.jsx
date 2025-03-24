import { useQuiz } from "../Context/QuizProvider";

const HomeScreen = () => {
  const { dispatch } = useQuiz();
  return (
    <div className="start">
      <h2>Welcome to the Quiz App</h2>
      <h3>Get Access to practice questions </h3>

      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "setup" })}
      >
        Lets Start
      </button>
    </div>
  );
};

export default HomeScreen;
