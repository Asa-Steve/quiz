import { useEffect } from "react";
import Loader from "./Loader";
import Option from "./Option";
import Footer from "./Footer";
import Error from "./Error";
import { trackEvent, trackTiming } from "../utils/gtag";
import { useQuiz } from "../Context/QuizProvider";

// Function to shuffle an array
const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

// Function to shuffle options while keeping track of the correct answer
const shuffleOptions = (question) => {
  const optionsWithIndex = question.options.map((option, index) => ({
    option,
    index,
  }));

  // Shuffle the options
  const shuffledOptions = shuffleArray(optionsWithIndex);

  // Find the new index of the correct answer
  const newCorrectIndex = shuffledOptions.findIndex(
    (opt) => opt.index === question.correctOption
  );

  // Return the updated question with shuffled options
  return {
    ...question,
    options: shuffledOptions.map((opt) => opt.option),
    correctOption: newCorrectIndex,
  };
};

const Questions = () => {
  const {
    questions,
    answer,
    reqNumOfQues,
    dispatch,
    isSubjectCompleted,
    selectedSubjects,
    index,
    currSubject,
    points,
    status,
  } = useQuiz();

  const numOfQuest = questions.length;
  const totalPoints = questions.reduce((acc, curr) => acc + curr.points, 0);

  // Fetching Questions
  useEffect(() => {
    async function fetchQuestions() {
      try {
        // const res = await fetch("https://quiz-resource.onrender.com/questions");
        const res = await fetch("http://localhost:5000/questions");
        if (!res.ok) throw new Error("Couldnt fetch Questions");
        const data = await res.json();

        if (Object.keys(data).length === 0)
          throw new Error("No Questions Found!");

        const randomizedQuestions = {};

        // Loop through each subject
        Object.keys(data).forEach((subject) => {
          // Shuffle options in each question
          let shuffledQuestions = data[subject].map(shuffleOptions);

          // Shuffle the order of questions
          shuffledQuestions = shuffleArray(shuffledQuestions);

          randomizedQuestions[subject] = shuffledQuestions;
        });

        const requiredQues = Object.keys(randomizedQuestions).reduce(
          (acc, currSubject) => {
            return {
              ...acc,
              [currSubject]: randomizedQuestions[currSubject].slice(
                0,
                reqNumOfQues
              ),
            };
          },
          {}
        );
        dispatch({ type: "active", payload: requiredQues });
      } catch (error) {
        if (error?.name !== "AbortError") {
          console.error("Fetch error: ", error);
        }
        dispatch({ type: "error" });
      }
    }

    fetchQuestions();
  }, [dispatch, reqNumOfQues]);

  // For Google Analytics to work
  useEffect(() => {
    // Start tracking when quiz mounts
    const startTime = Date.now(); // Start timer
    trackEvent("Quiz", "Started", "User started the quiz");
    return () => {
      // When quiz unmounts, calculate the duration
      if (startTime) {
        const duration = Date.now() - startTime;
        trackTiming("Quiz Completion Time", duration);
        trackEvent("Quiz", "Completed", "User finished the quiz");
      }
    };
  }, []);

  return status === "loading" ? (
    <Loader />
  ) : (
    <>
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
              }
            >
              {subject}
            </button>
          ))}
        </div>
        {isSubjectCompleted ? (
          <div className="completed">Completed</div>
        ) : (
          <>
            <div className="progress">
              <progress
                max={numOfQuest}
                value={index + Number(answer !== null)}
              />
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
                <Option option={option} idx={idx} key={option} />
              ))}
            </div>
          </>
        )}

        <Footer />
      </div>
    </>
  );
};

export default Questions;
