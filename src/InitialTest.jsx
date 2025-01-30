import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const InitialTest = () => {
  const [course, setCourse] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate=useNavigate();
  const selectedCourse = async (evt) => {
    // const selectElement = document.querySelector("select");
    const selectElement = evt.target.value;
    alert(selectElement)
    if (selectElement) {
      const selectedValue = selectElement;
      setCourse(selectedValue);

      // Call the backend to update the course
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Unauthorized. Please log in again.");
        return;
      }

      try {
        const response = await fetch("https://mainbackend.up.railway.app/update-course", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ course: selectedValue }),
        });

        const result = await response.json();
        alert(result.user.completedcourses)
        if(result.user.completedcourses.includes("java")){
          navigate("/profile");
        }
        if (response.ok) {
          setSuccessMessage(result.message);
          document.getElementById("confirmation").style.display = "block";
        } else {
          setErrorMessage(result.message || "Failed to update the course.");
        }
      } catch (error) {
        console.error("Error:", error);
        setErrorMessage("Something went wrong!");
      }
    }
  };

  return (
    <div style={{ width: "100%", overflow: "hidden" }}>
      <h1>Hello from Initial Test</h1>
      <div className="selection">
        <label>Select the course from the given options</label>
        {/* <select>
          <option value="html">HTML</option>
          <option value="js">JavaScript</option>
          <option value="java">Java</option>
          <option value="css">CSS</option>
          <option value="python">PYTHON</option>
          <option value="react">React</option>
        </select> */}
        <button onClick={(e)=>selectedCourse(e)} value={"JAVA"} className="courseName">JAVA</button>
        
        <button onClick={(e)=>selectedCourse(e)} value={"JAVASCRIPT"} className="courseName">JAVASCRIPT</button>
        
        <button onClick={(e)=>selectedCourse(e)} value={"PYTHON"} className="courseName">PYTHON</button>
        
        <button onClick={(e)=>selectedCourse(e)} value={"HTML"} className="courseName">HTML</button>
        
        <button onClick={(e)=>selectedCourse(e)} value={"CSS"} className="courseName">CSS</button>
        
        <button onClick={(e)=>selectedCourse(e)} value={"JS"} className="courseName">JS</button>
        
        
      </div>
      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
      {successMessage && <div style={{ color: "green" }}>{successMessage}</div>}
      <div
        className="confirmation"
        id="confirmation"
        style={{
          display: "none",
          color: "black",
          top: "-1px",
          left: "-1px",
          width: "100%",
          backgroundColor: "aqua",
          height: "97vh",
          overflow: "hidden",
        }}
      >
        <div className="pop-up">
          <h1>Great!!!! Let's Start Learning {course}</h1>
          <h4>
            Let's take an initial assessment to check your prior knowledge in{" "}
            {course}
          </h4>
          <a href="/test"><input type="button" value="Start" /></a>
        </div>
      </div>
    </div>
  );
};

export default InitialTest;
