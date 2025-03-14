import { act, useReducer } from "react";
import Header from "./Header";
import HomeScreen from "./HomeScreen";
import Main from "./Main";
import Setup from "./Setup";
import Questions from "./Questions";
import FinishScreen from "./FinishScreen";

const initialState = {
  questions: [],
  allQuestions: {},
  subjectProgress: {}, //to keep track of subjects when there are switched
  // intro,loading , setup , start, ready , failed, finish , reset
  status: "intro",
  selectedSubjects: [], //for storing subjects selected by user
  answer: null,
  index: 0, //question index
  points: 0, //points gained in the quiz
  timeAllowed: 600, //time for course in secs
  totalAnswered: null,
  currSubject: 0, // used to get first subject in the subjects array above
};

function reducer(state, action) {
  switch (action.type) {
    case "setup":
      return { ...state, status: "setup" };
    case "selectSubject":
      return {
        ...state,
        selectedSubjects: state.selectedSubjects.includes(action.payload)
          ? state.selectedSubjects.filter((e) => e !== action.payload)
          : state.selectedSubjects.length < 4
          ? [...state.selectedSubjects, action.payload]
          : state.selectedSubjects,
      };

    case "start":
      return { ...state, status: "loading" };

    case "active":
      return {
        ...state,
        status: "ready",
        allQuestions: action.payload,
        questions: action.payload[state.selectedSubjects[state.currSubject]],
      };
    case "submitAnswer":
      return {
        ...state,
        answer: action.payload,
      };

    case "nextQuestion":
      // return {
      //   ...state,
      //   index: state.index + 1,
      //   points:
      //     state.questions.at(state.index).correctOption === action.payload
      //       ? state.points + state.questions.at(state.index).points
      //       : 0,
      //   answer: null,
      //   totalAnswered: state.totalAnswered + 1,
      // };
      return {
        ...state,
        index: state.index + 1,
        points:
          state.questions.at(state.index).correctOption === action.payload
            ? state.points + state.questions.at(state.index).points
            : state.points, // Keep previous points instead of resetting to 0

        answer: null,
        totalAnswered: (state.totalAnswered || 0) + 1, // Ensure it's not null
      };

    case "switchSubject": {
      const newSubject = action.payload;

      return {
        ...state,

        // saving progress for later switch
        subjectProgress: {
          ...state.subjectProgress,
          [state.selectedSubjects[state.currSubject]]: {
            index: state.index,
            points: state.points,
            totalAnswered: state.totalAnswered,
            isCompleted:
              state.index === state.questions[state.currSubject].length - 1
                ? true
                : false,
          },
        },

        // switching
        currSubject: state.selectedSubjects.indexOf(newSubject),
        questions: state.allQuestions[newSubject],
        index: state.subjectProgress[newSubject]?.index || 0,
        points: state.subjectProgress[newSubject]?.points || 0,
        totalAnswered: state.subjectProgress[newSubject]?.totalAnswered || 0,
        answer: null,
      };
    }

    case "tick":
      return { ...state, timeAllowed: state.timeAllowed - 1 };
    case "finish":
      return { ...state, status: "finish", timeAllowed: 0 };
    case "retake":
      return { ...initialState };
    default:
      throw new Error("Unknown action type");
  }
}
const App = () => {
  const [
    {
      questions,
      status,
      selectedSubjects,
      index,
      answer,
      points,
      timeAllowed,
      totalAnswered,
      currSubject,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "intro" && <HomeScreen dispatch={dispatch} />}
        {status === "setup" && (
          <Setup dispatch={dispatch} selectedSubjects={selectedSubjects} />
        )}
        {(status === "loading" || status === "ready") && (
          <Questions
            dispatch={dispatch}
            status={status}
            questions={questions}
            index={index}
            answer={answer}
            points={points}
            timeAllowed={timeAllowed}
            selectedSubjects={selectedSubjects}
            currSubject={currSubject}
          />
        )}

        {status === "finish" && (
          <FinishScreen
            points={points}
            questions={questions}
            totalAnswered={totalAnswered}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
};

export default App;
