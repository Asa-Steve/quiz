import { useReducer } from "react";
import Header from "./Header";
import HomeScreen from "./HomeScreen";
import Main from "./Main";
import Setup from "./Setup";
import Questions from "./Questions";
import FinishScreen from "./FinishScreen";

import { initialState, reducer } from "../utils/reducerFn";

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
      isSubjectCompleted,
      subjectProgress,
      totalTime,
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
            isSubjectCompleted={isSubjectCompleted}
            totalTime={totalTime}
          />
        )}

        {status === "finish" && (
          <FinishScreen
            points={points}
            questions={questions}
            totalAnswered={totalAnswered}
            dispatch={dispatch}
            subjectProgress={subjectProgress}
          />
        )}
      </Main>
    </div>
  );
};

export default App;
