import { useState } from "react";

const CourseSelect = ({ dispatch, subject }) => {
  function handleSelect(subject) {
    dispatch({ type: "selectSubject", payload: subject });
    setSelected((prev) => !prev);
  }
  const [selected, setSelected] = useState(false);

  return (
    <div key={subject} onClick={() => handleSelect(subject)}>
      {<span>{selected && "✅"}</span>} {subject}
    </div>
  );
};

export default CourseSelect;
