const Setup = ({ dispatch, selectedSubjects }) => {
  const subj = ["English", "Mathematics", "Biology", "Physics", "Chemistry"];
  const numSUbject = selectedSubjects.length;
  return (
    <div className="setup">
      <h3>Select at most four ( 4 ) subjects</h3>

      <div className="course_select">
        {subj.map((subject) => (
          <div
            key={subject}
            onClick={() =>
              dispatch({ type: "selectSubject", payload: subject })
            }
          >
            <span className="check">
              {selectedSubjects.find((e) => e === subject) && "✅"}
            </span>
            {subject}
          </div>
        ))}
      </div>
      <div className="proceed">
        {numSUbject >= 1 && numSUbject <= 4 && (
          <button
            className="btn btn-ui"
            onClick={() => dispatch({ type: "start" })}
          >
            Proceed
          </button>
        )}
      </div>
    </div>
  );
};

export default Setup;
