import React from "react";

function QuestionItem({ question, onDeleteQuestion, onUpdateQuestion }) {
  const { id, prompt, answers, correctIndex } = question;

  function handleDeleteClick() {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    }).then(() => onDeleteQuestion(id));
  }

  function handleCorrectAnswerChange(e) {
    const newIndex = parseInt(e.target.value);

    //  Immediate UI update for test
    onUpdateQuestion({ ...question, correctIndex: newIndex });

    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex: newIndex }),
    })
      .then((r) => r.json())
      .then((updatedQuestion) => onUpdateQuestion(updatedQuestion));
  }

  return (
    <li>
      <h4>{prompt}</h4>
      <label htmlFor={`correct-${id}`}>Correct Answer</label>
      <select
        id={`correct-${id}`}
        aria-label="Correct Answer"
        value={String(correctIndex)}
        onChange={handleCorrectAnswerChange}
      >
        {answers.map((answer, index) => (
          <option key={index} value={String(index)}>
            {answer}
          </option>
        ))}
      </select>
      <button onClick={handleDeleteClick}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
