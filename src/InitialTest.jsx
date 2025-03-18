import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Progress from "./progress";
const InitialTest = () => {
  const [course, setCourse] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [java, setJavaProgress] = useState(0);
  const [python, setPythonProgress] = useState(0);
  const [js, setJsProgress] = useState(0);
  const [html, setHtmlProgress] = useState(0);
  const [name, setName] = useState(0);
  const [css, setCssProgress] = useState(0);
  const [selectedCourses, setSelectedcourses] = useState([]);
  const [willing, setWilling] = useState(0);
  var jprogress, pprogress, cssprogress, htmlprogress, jsprogress;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found. Please log in.");
        return;
      }
      try {
        const response = await fetch("https://mainbackend-859c.onrender.com/profile", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const result = await response.json();

        if (response.ok) {
          setJavaProgress(Math.round((result.user.java / (result.user.javaprogress - 2)) * 100));
          setPythonProgress(Math.round((result.user.python / (result.user.pythonprogress - 2)) * 100));
          setJsProgress(Math.round((result.user.js / (result.user.jsprogress - 2)) * 100));
          setHtmlProgress(Math.round((result.user.html / (result.user.htmlprogress - 2)) * 100));
          setCssProgress(Math.round((result.user.css / (result.user.cssprogress - 2)) * 100));
          setName(result.user.firstname)

        } else {
          console.error("Error fetching profile:", result.message);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        alert("Something went wrong!");
      }
    };

    fetchProfile();
  }, []);

  const selectedCourse = async (evt) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Unauthorized. Please log in again.");
      return;
    }

    const selectedValue = evt.target.value; // Get selected course value
    if (!selectedValue) return; // Prevent empty selections

    setCourse(selectedValue);

    try {
      const response = await fetch("https://mainbackend-859c.onrender.com/update-course", {
      // const response = await fetch("http://localhost:8001/update-course", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ course: selectedValue }),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccessMessage(result.message);
        setSelectedcourses(result.user.selectedcourses)
        let course1 = (result.user.course).length > 7 ? result.user.course.slice(8) : result.user.course
        if (Array.isArray(result.user.selectedcourses) &&
          result.user.selectedcourses.includes(course1.toUpperCase())) {
          navigate("/profile"); // Replaced "/profile" with "/course-page"
        } else {
          navigate("/test");
        }
      } else {
        setErrorMessage(result.message || "Failed to update the course.");
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("Something went wrong!");

    }
  };
  
  return (
    <div className="body55">
      <div className="container">
        <h1 className="heading">WELCOME {name} ! </h1>
        <div className="selection">
          <label className="label">Every Click Takes You Closer to Mastery! </label>

          <div className="first-three"  >
            <div className="courseName" >
              <img className="img88" src="/java.png" alt="" />
              <button className="btn-all" >JAVA
                <Progress pro={java} />
              </button>
              <button className="onClick" onClick={(e) => selectedCourse(e)} value={"JAVA"} >{java > 0 ? java >= 100 ? "REVISIT" : "  CONTINUE" : "START"}</button>
            </div>


            <div className="courseName" >
              <img className="img88" src="/js.png" alt="" />
              <button className="btn-all">
                JAVASCRIPT
                <Progress pro={js} />
              </button>
              <button className="onClick" onClick={(e) => selectedCourse(e)} value={"JS"} >{js > 0 ? js >= 100 ? "REVISIT" : "  CONTINUE" : "START"}</button>
            </div>


            <div className="courseName" >
              <img className="img88" src="/python.png" alt="" />
              <button className="btn-all"   >
                PYTHON
                <Progress pro={python} />
              </button>
              <button className="onClick" onClick={(e) => selectedCourse(e)} value={"PYTHON"} >{python > 0 ? python >= 100 ? "REVISIT" : "  CONTINUE" : "START"}</button>
            </div>
          </div>


          <div className="first-three"  >
            <div className="courseName"  >
              <img className="img88" src="/html.png" alt="" />
              <button className="btn-all"   >
                HTML
                <Progress pro={html} />
              </button>
              <button className="onClick" onClick={(e) => selectedCourse(e)} value={"HTML"}>{html > 0 ? html >= 100 ? "REVISIT" : "  CONTINUE" : "START"}</button>
            </div>


            <div className="courseName" >
              <img className="img88" src="/css.png" alt="" />
              <button className="btn-all" >
                CSS
                <Progress pro={css} />
              </button>
              <button className="onClick" onClick={(e) => selectedCourse(e)} value={"CSS"}>{css > 0 ? css >= 100 ? "REVISIT" : "  CONTINUE" : "START"}
              </button>
            </div>
          </div>



        </div>
        {errorMessage && <div className="errorMessage" style={{ color: "white" }}>{errorMessage}</div>}
        {successMessage && <div className="successMessage" style={{ color: "white" }}>{successMessage}</div>}

      </div>
    </div>
  );
};

export default InitialTest;
