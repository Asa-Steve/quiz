import { useEffect } from "react";
import Header from "./Header";
import HomeScreen from "./HomeScreen";
import Main from "./Main";
import Setup from "./Setup";
import Questions from "./Questions";
import FinishScreen from "./FinishScreen";

// Utils
import { initGA } from "../utils/gtag";
import Error from "./Error";
import { useQuiz } from "../Context/QuizProvider";

const App = () => {
  useEffect(() => {
    initGA(); // Initialize Google Analytics when the app loads
  }, []);

  const { status } = useQuiz();
  return (
    <div className="app">
      <Header />
      <Main>
        {status === "intro" && <HomeScreen />}
        {status === "setup" && <Setup />}
        {(status === "loading" || status === "ready") && <Questions />}

        {status === "finish" && <FinishScreen />}

        {status === "error" && <Error />}
      </Main>
    </div>
  );
};

export default App;
