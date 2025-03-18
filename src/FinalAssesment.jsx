import React, { useEffect, useState } from "react";
import { Await, useNavigate } from "react-router-dom";
import FinalAssessmentRules from "./FinalAssessmentRules";

const FinalTest = () => {
  const [questions, setQuestions] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [originalAnswers, setOriginalAnswers] = useState([]);
  const [answerStatus, setAnswerStatus] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [isEligible, setEligible] = useState(false);
  const [time, setTime] = useState(1200); // 20 minutes in seconds
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setErrorMessage("Unauthorized. Please log in again.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("https://mainbackend-859c.onrender.com/finaltest", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const result = await response.json();

        if (response.ok) {
          setQuestions(result);
          // Store indices of correct answers
          const correctAnswersList = result.map((q) => q.answer);
          setOriginalAnswers(correctAnswersList);

          // Initialize selectedAnswers to undefined for each question
          setSelectedAnswers(
            result.reduce((acc, _, idx) => ({ ...acc, [idx]: undefined }), {})
          );
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


  useEffect(() => {
    let timer;
    if (isActive && time > 0) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    }
    if (time === 0 && isActive) {
      setIsActive(false);
      handleTimerEnd();
    }
    return () => clearInterval(timer);
  }, [isActive, time]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const navigate = useNavigate();

  const handleOptionChange = (questionIndex, selectedOptionIndex) => {
    setSelectedAnswers((prevSelectedAnswers) => ({
      ...prevSelectedAnswers,
      [questionIndex]: selectedOptionIndex,
    }));
  };

  const isSubmitEnabled = questions.every(
    (_, index) => selectedAnswers[index] !== undefined
  );

  const getAnswerStatus = (index) => {
    if (selectedAnswers[index] === undefined) return null;
    return selectedAnswers[index] === originalAnswers[index]
      ? "Correct"
      : "Incorrect";
  };

  const enablePopup = () => {
    const statuses = questions.map((_, index) => getAnswerStatus(index));
    setAnswerStatus(statuses);

    const correctCount = statuses.filter((status) => status === "Correct").length;
    setCorrectAnswers(correctCount);

    setPopupVisible(true);
    setEligible(correctCount >= 10);
  };



  const complete = async () => {
    const token = localStorage.getItem("token");
    try {
      // Make sure `token` is valid and not null or undefined
      if (!token) {
        alert('Token is missing!');
        return;
      }

      const res = await fetch("https://mainbackend-859c.onrender.com/complete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Corrected Authorization header
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        // If the response is not OK, log the error status and message
        const errorData = await res.json();
        console.error("Error:", errorData.message);
        alert(`Error: ${errorData.message}`);
      } else {
        // If successful, log the response
        const data = await res.json();
        console.log("Success:", data);
      }
    } catch (error) {
      // Catch and log any errors in the try-catch block
      console.error("Error:", error);
      alert('An error occurred!');

    }
    navigate("/certificate")
  };

  const handleTimerEnd = () => {
    alert("Time's up!");
    enablePopup();
  };


  const init = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        alert("No token found.");
        return;
      }

      const response = await fetch("https://mainbackend-859c.onrender.com/save-result-again", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();
      console.log("Response:", result); // Check if this logs the expected result

      if (response.ok) {
        alert("Test results are saved!");
        navigate("/profile");
      } else {
        alert(`Failed to save results: ${result.message || "Unknown error"}`);
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
    </div></div>
  }
  const starting = (e) => { 
    e.preventDefault();
    document.getElementById("rules").style.display = "none";
    document.getElementById("main").style.display = "block";
    setIsActive(true);
  };
  
  const enable=()=>{

    if(document.getElementById('check').checked){
      document.getElementById("submit").disabled=false
    }
    else{
      document.getElementById("submit").disabled=true
    }
  }
  return (
    <>
      <div className="rules" id="rules">
        <FinalAssessmentRules  />
        <form  onSubmit={starting} >
        <div className="checkBox">
        <input type="checkbox" id="check"  onClick={enable} /> I have read the details properly and I am ready to take the final assessment.
        </div>
        <input type="submit" value="Start"  disabled   id="submit"     className="submit-button"  />
        </form>
      </div>

      <div className="main"  style={{display:'none'}} id="main">

      {isPopupVisible ? (

        <div className="pop-con">
          <h3>Total Correct Answers: {correctAnswers}</h3>
          {isEligible ? (
            <button onClick={() => { complete() }}>
              Download Certificate
            </button>
          ) : (
            <button onClick={() => init()}>RESTART THE COURSE</button>
          )}
        </div>
      ) : (
        <div className="body111" >
          <br />
          <div className="test-container">
            <h1 className="test-heading">Final Assesment</h1>
            <h1 className="test-heading" >{formatTime(time)}</h1>
            {/* <button onClick={() => }>Start</button> */}

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
              <p>No questions available.</p>
            )}

            <input className="submit-button"
              type="button"
              value="Submit"
              disabled={!isSubmitEnabled}
              onClick={enablePopup}
            />

            {answerStatus.length > 0 && (
              <div>
                <h2>Answer Status</h2>
                <ul>
                  {answerStatus.map((status, index) => (
                    <li key={index}>
                      Question {index + 1}: {status}
                    </li>
                  ))}
                </ul>
                <h3>Total Correct Answers: {correctAnswers}</h3>
              </div>
            )}
          </div>
          <br />
        </div>
      )}
      </div>
    </>
  );
};

export default FinalTest;