export const initialState = {
  questions: [],
  allQuestions: {},
  subjectProgress: {}, //to keep track of subjects when there are switched
  // intro,loading , setup , start, ready , failed, finish , reset
  status: "intro",
  selectedSubjects: [], //for storing subjects selected by user
  answer: null,
  index: 0, //question index
  points: 0, //points gained in the quiz
  timeAllowed: null, //time for course in secs
  totalAnswered: null,
  totalQuestions: null,
  currSubject: 0, // used to get first subject in the subjects array above
  isSubjectCompleted: false, // used to verify if a subject is completed
  completed: [],
  maxPoints: null,
  totalTime: null,
  reqNumOfQues: 50,
};

export function reducer(state, action) {
  // Switch statement to handle various Action types
  switch (action.type) {
    // Setup handles the setup screen ( the Course Selection screen )
    case "setup":
      return { ...state, status: "setup" }; //Basically just Displays a UI

    // handles the selected subjects ( the logic for what subjects to extract and administer resides here )
    case "selectSubject":
      return {
        ...state,
        //handles ticking subjects and limiting the courses selected to 4
        selectedSubjects: state.selectedSubjects.includes(action.payload)
          ? state.selectedSubjects.filter((e) => e !== action.payload)
          : state.selectedSubjects.length < 4
          ? [...state.selectedSubjects, action.payload]
          : state.selectedSubjects,
      };

    // A brief Loading state between fetching data( questions ) and storing it
    case "start":
      return { ...state, status: "loading", reqNumOfQues: +action.payload };
    // Questions Fetched and ready
    case "active": {
      const time =
        state.selectedSubjects.reduce(
          (acc, subject) => acc + action.payload[subject].length,
          0
        ) * 30;
      return {
        ...state,
        status: "ready",
        allQuestions: action.payload, //Storing all the questions gotten
        questions: action.payload[state.selectedSubjects[state.currSubject]], // Setting the current or first subject to be answered to the first subject chosen
        totalQuestions:
          action.payload[state.selectedSubjects[state.currSubject]].length, //computing the totalQuestions
        maxPoints: action.payload[
          state.selectedSubjects[state.currSubject]
        ].reduce((acc, curr) => acc + curr.points, 0), // trying to figure out the max point that can be attained in this course
        //setting the Time Allowed for the lesson to be 30sec/ question
        timeAllowed: time,
        totalTime: time,
      };
    }
    // Handles submission Logic
    case "submitAnswer":
      return {
        ...state,
        answer: action.payload,
        points:
          state.questions.at(state.index).correctOption === action.payload
            ? state.points + state.questions.at(state.index).points
            : state.points, // Keep previous points instead of resetting to 0

        totalAnswered: (state.totalAnswered || 0) + 1, // Ensures it's not null
        isSubjectCompleted:
          state.questions.length - 1 === state.index ? true : false, //Checking if subject is completed ( so as not to exceed the question number when assigning question index)
      };

    // Handles Next question Logic
    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1, //shfits the index by 1
        answer: null, //resets the answer property
      };

    // Handles the Submit Logic
    case "submitQuestion": {
      // Checking if all the subjects have been fully completed
      const allCompleted =
        state.completed.length === 0 // checking if its the initial state
          ? Array(state.selectedSubjects.length).fill(false) //if its the initial state, i set dynamically generate the Array and set them all to false as default
          : state.completed; // if its not the initial state, i remember the previous state , so as not to loose data

      allCompleted[state.currSubject] = true; // i find the current subjects position and update to true (i.e finished)

      const lastSubject = // checking if it is the last subject and if not i proceed to the next subject
        state.currSubject === state.selectedSubjects.length - 1 ? true : false;

      const notCompleted = allCompleted.indexOf(false); //  checking to see if i have any unfinished subject, if true, i return to it

      const nextSubjIndex =
        lastSubject && notCompleted < 0 // all completed if this returns true
          ? state.currSubject // if all subjects are completed , i dont bother switching to any other subject
          : notCompleted;

      const nextSubject = state.selectedSubjects.at(nextSubjIndex); // getting next subject if truly user havent finished the subjects

      return {
        ...state,
        completed: allCompleted,
        status: allCompleted.every((subject) => subject === true) // if all is completed , quiz finishes
          ? "finish"
          : state.status, // else revert to previous state

        // saving progress for later
        subjectProgress: {
          ...state.subjectProgress,
          [state.selectedSubjects[state.currSubject]]: {
            index: state.index,
            points: state.points,
            totalAnswered: state.totalAnswered,
            isSubjectCompleted: true,
            totalQuestions: state.totalQuestions,
            maxPoints: state.maxPoints,
          },
        },

        // switching between subjects
        currSubject: nextSubjIndex,
        questions: state.allQuestions[nextSubject],
        index: state.subjectProgress[nextSubject]?.index || 0,
        points: state.subjectProgress[nextSubject]?.points || 0,
        totalAnswered: state.subjectProgress[nextSubject]?.totalAnswered || 0,
        answer: null,
        isSubjectCompleted: false,
      };
    }

    // this Logic is responsible for controlling subjects switches
    case "switchSubject": {
      const newSubject = action.payload; //Getting the subject to switch to
      const switchToSelf =
        state.selectedSubjects[state.currSubject] === newSubject; // Checking if user is clicking on already active subject
      return {
        ...state,
        // saving progress for later switch
        subjectProgress: {
          ...state.subjectProgress,
          [state.selectedSubjects[state.currSubject]]: {
            index: state.index,
            points: state.points,
            totalAnswered: state.totalAnswered,
            isSubjectCompleted: state.isSubjectCompleted,
            totalQuestions: state.totalQuestions,
            maxPoints: state.maxPoints,
          },
        },
        // switching
        currSubject: state.selectedSubjects.indexOf(newSubject),
        questions: switchToSelf
          ? state.questions
          : state.allQuestions[newSubject],
        index: switchToSelf
          ? state.index
          : state.subjectProgress[newSubject]?.index || 0,
        points: switchToSelf
          ? state.points
          : state.subjectProgress[newSubject]?.points || 0,
        totalAnswered: switchToSelf
          ? state.totalAnswered
          : state.subjectProgress[newSubject]?.totalAnswered || 0,
        isSubjectCompleted:
          state.subjectProgress[newSubject]?.isSubjectCompleted || false,
        answer: null,
      };
    }

    // this controls the timer (Quiz time)
    case "tick":
      return { ...state, timeAllowed: state.timeAllowed - 1 }; // reduce the time by 1 every second

    // this handles the final submit state. in a case where user time ends before completing a subject
    // case "finish": {
    //   // Ensuring all selected subjects are stored in subjectProgress
    //   // you can spend some time here to try and understand what is going on here in the reduce fn ( a bit tricky, so spend some time here )
    //   const updatedSubjectProgress = state.selectedSubjects.reduce(
    //     (acc, subject) => {
    //       acc[subject] = state.subjectProgress[subject] || {
    //         index: 0,
    //         points: 0,
    //         totalAnswered: 0,
    //         isSubjectCompleted: false,
    //         totalQuestions: state.allQuestions[subject]?.length || 0,
    //         maxPoints:
    //           state.allQuestions[subject]?.reduce(
    //             (sum, q) => sum + q.points,
    //             0
    //           ) || 0,
    //       };
    //       return acc;
    //     },
    //     {
    //       ...state.subjectProgress,
    //       [state.selectedSubjects[state.currSubject]]: {
    //         index: state.index,
    //         points: state.points,
    //         totalAnswered: state.totalAnswered,
    //         isSubjectCompleted: true,
    //         totalQuestions: state.totalQuestions,
    //         maxPoints: state.maxPoints,
    //       },
    //     }
    //   );

    //   return {
    //     ...state,
    //     status: "finish",
    //     subjectProgress: updatedSubjectProgress,
    //   };
    // }
    case "finish": {
      // Identify the currently selected subject
      const subjectKey = state.selectedSubjects[state.currSubject];

      // Update only the current subject's progress
      const updatedSubjectProgress = {
        ...state.subjectProgress, // Preserve existing subjects
        [subjectKey]: {
          ...state.subjectProgress[subjectKey], // Preserve previous progress
          index: state.index, // ✅ Store last answered index
          points: state.points, // ✅ Store subject-specific points
          totalAnswered: state.totalAnswered, // ✅ Store subject-specific total answered
          isSubjectCompleted: true, // ✅ Mark subject as completed
          totalQuestions: state.totalQuestions, // Keep total question count
          maxPoints: state.maxPoints, // Preserve max points for the subject
        },
      };

      return {
        ...state,
        status: "finish",
        subjectProgress: updatedSubjectProgress, // ✅ Assign updated subject progress
      };
    }

    // Handling the retake state. to enable user try again
    case "retake":
      return { ...initialState };
    case "error":
      return { ...state, status: "error" };
    default:
      throw new Error("Unknown action type");
  }
}
