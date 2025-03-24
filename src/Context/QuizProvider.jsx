import { createContext, useContext, useReducer } from "react";
import { reducer, initialState } from "../utils/reducerFn";
// 1) creating a context
const QuizContext = createContext();

const QuizProvider = ({ children }) => {
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
      reqNumOfQues,
    },
    dispatch,
  ] = useReducer(reducer, initialState);
  
  return (
    <QuizContext.Provider
      value={{
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
        reqNumOfQues,
        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined) throw new Error("Context used outside provider");
  return context;
}
export { QuizProvider, useQuiz };
