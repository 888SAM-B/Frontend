  import React, { useEffect, useState } from "react";

const Test = () => {
  const [questions, setQuestions] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [originalAnswers, setOriginalAnswers] = useState([]);
  const [answerStatus, setAnswerStatus] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  useEffect(() => {
    const fetchQuestions = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setErrorMessage("Unauthorized. Please log in again.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("http://localhost:8001/test", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const result = await response.json();

        if (response.ok) {
          setQuestions(result);
          const correctAnswersList = result.map((q) => q.answer); // Assuming the correct answer is stored in `answer` field
          setOriginalAnswers(correctAnswersList);
        } else {
          setErrorMessage(result.message || "Failed to fetch questions.");
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
        setErrorMessage("Something went wrong!");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const handleOptionChange = (questionIndex, selectedOptionIndex) => {
    setSelectedAnswers((prevSelectedAnswers) => ({
      ...prevSelectedAnswers,
      [questionIndex]: selectedOptionIndex,
    }));
  };

  const isSubmitEnabled = questions.every((_, index) => selectedAnswers[index] !== undefined);

  const getAnswerStatus = (index) => {
    if (selectedAnswers[index] === undefined) return null;
    return selectedAnswers[index] === originalAnswers[index] ? "Correct" : "Incorrect";
  };

  const enablePopup = async () => {
    const statuses = questions.map((_, index) => getAnswerStatus(index));
    setAnswerStatus(statuses);

    const correctCount = statuses.filter((status) => status === "Correct").length;
    setCorrectAnswers(correctCount);

    document.querySelector(".pop-con").style.display = "block";
    document.querySelector(".test-container").style.filter = "blur(5.5px)";
    if (correctCount >= 5) {
      document.querySelector(".eligible").style.display = "block";
      document.querySelector(".eligible1").style.display = "block";
    } else {
      document.querySelector(".noteligible").style.display = "block";
    }
  };

  const init = async (currentWilling) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:8001/save-results", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          correctAnswers,
          willing: currentWilling,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Test submitted successfully and results saved!");
        window.location.href = "/profile"; // Navigate after the successful API call
      } else {
        alert(`Failed to save results: ${result.message}`);
      }
    } catch (error) {
      console.error("Error saving results:", error);
      alert("Error saving results.");
    }
  };

  if (loading) {
    return <div className="body99"  > <div class="content">
    <div class="circle"></div>
    <div class="circle"></div>
    <div class="circle"></div>
    <div class="circle"></div>
</div></div>;
  }

  return (
    <>
  
    <div className="pop-con" style={{ display: "none" }}>
      <h3>Total Correct Answers: {correctAnswers}</h3>

      <button
        className="eligible "
        style={{ display: "none" }}
        onClick={() => init(1)}
      >
        TAKE ADVANCED COURSE
      </button>

      <button
        className="eligible1 "
        style={{ display: "none" }}
        onClick={() => init(0)}
      >
        START FROM SCRATCH
      </button>

      <button
        className="noteligible"
        style={{ display: "none" }}
        onClick={() => init(0)}
      >
        START THE COURSE
      </button>
    </div>
<div className="body111">
    <div className="test-container">
<h1 className="test-heading">Test</h1>
{errorMessage && <p className="error-message" style={{ color: "red" }}>{errorMessage}</p>}
{questions.length > 0 ? (
  <div className="questions-container">
    {questions.map((q, index) => (
      <div key={index} className="question-block">
        <h3 className="question-title">
          {index + 1}. {q.question}
        </h3>
        <ul className="options-list">
          {q.options.map((option, idx) => (
            <li key={idx} className="option-item">
              <label className="option-label">
                <input
                  className="option-input"
                  type="radio"
                  name={`question-${index}`}
                  value={idx}
                  checked={selectedAnswers[index] === idx}
                  onChange={() => handleOptionChange(index, idx)}
                />
                {option}
              </label>
            </li>
          ))}
        </ul>
      </div>
    ))}
  </div>
) : (
  <p className="no-questions-message">No questions available.</p>
)}
<input
  className="submit-button Take-Final-Assessment"
  type="button"
  value="Submit"
  disabled={!isSubmitEnabled}
  onClick={enablePopup}
/>
{/* {answerStatus.length > 0 && (
  <div className="answer-status-container">
    <h2 className="answer-status-heading">Answer Status</h2>
    <ul className="answer-status-list">
      {answerStatus.map((status, index) => (
        <li key={index} className="answer-status-item">
          Question {index + 1}: {status}
        </li>
      ))}
    </ul>
    <h3 className="total-correct">Total Correct Answers: {correctAnswers}</h3>
  </div>
)} */}
</div>
</div>
  </>  
  );
};

export default Test;
