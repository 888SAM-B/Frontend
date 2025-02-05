import React, { useState, useEffect } from "react";
import Chatbot from './chatbot';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    username: "",
  });
  const [courses, setCourses] = useState([]);
  const [completedcourses, setCompletedCourses] = useState([]);
  const [error, setError] = useState("");
  const [state, setState] = useState(0);
  const [course, setCourse] = useState("");
  const [id, setId] = useState(0); // Tracks progress
  const [contentId, setContentId] = useState(0); // Tracks content navigation
  const [done, setDone] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Unauthorized. Please log in again.");
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await fetch("https://mainbackend.up.railway.app/profile", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const result = await response.json();

        if (response.ok) {
          setUserData({
            firstname: result.user.firstname,
            lastname: result.user.lastname,
            username: result.user.username,
          });

          if (result.user.completedcourses.includes(result.user.course)) {
            setDone(1);
          } else {
            setDone(0);
          }

          setState(result.user.state);
          setId(result.user.state);
          setContentId(result.user.state);
          setCompletedCourses(result.user.completedcourses || []);
          setCourse(result.user.course || "");
        } else {
          alert(result.message);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        alert("Something went wrong!");
      }
    };

    const fetchCourses = async () => {
      try {
        const response = await axios.get("https://mainbackend.up.railway.app/courses", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCourses(response.data || []);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchCourses();
    fetchProfile();
  }, [state]);

  useEffect(() => {
    if (courses.length > 0 && completedcourses.length > 0) {
      if (completedcourses.includes(course)) {
        setId(courses.length - 1); // Set ID to last course if completed
      } else {
        setId(state);
      }
    }
  }, [courses, completedcourses, course, state]);

  const handleNext = async () => {
    if (contentId < courses.length - 1) {
      setContentId(contentId + 1); // Move content forward
    }

    if (id < courses.length - 1) { // Update progress only when moving forward
      setId(id + 1);
      try {
        const token = localStorage.getItem("token");
        await fetch("https://mainbackend.up.railway.app/save-current-state", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            currentstate: id + 1,
          }),
        });
      } catch (error) {
        console.error("Error saving results:", error);
        alert("Error saving results.");
      }
    }
  };

  const handlePrevious = () => {
    setContentId((prevContentId) => (prevContentId > 0 ? prevContentId - 1 : prevContentId));
  };

  const progress = courses.length > 0 ? (id / (courses.length - 1)) * 100 : 0;

  return (
    <div className="body41">
      <div className="profile-container">
        <h1 className="profile-title">Profile</h1>
        <p className="profile-info"><strong className="profile-label">First Name :</strong> <span>{userData.firstname} {userData.lastname} </span> </p>
        <p className="profile-info"><strong className="profile-label">Username &nbsp; :</strong> <span>{userData.username}</span></p>
        

        <h2 className="courses-title">Course</h2>
        {error && <p className="error-message">Error: {error}</p>}

        {courses.length > 0 ? (
          <div className="courses-container">
            <div className="progress-container">
              <div className="progress-bar-background">
                <div className="progress-bar-filled" style={{ width: `${progress}%` }}></div>
              </div>
              <p className="progress-text">{Math.round(progress)}% completed</p>
            </div>

            <h2 className="module-title">{courses[contentId]?.module || "Loading..."}</h2>
            <h3 className="course-title">{contentId + 1}. {courses[contentId]?.title || "Loading..."}</h3>
            <p className="course-content">{courses[contentId]?.content || "Loading..."}</p>

            <button className="course-button" onClick={handlePrevious} disabled={contentId === 0}>
              Back
            </button>
            <button className="course-button" onClick={handleNext} disabled={contentId === courses.length - 1}>
              Next
            </button>

            <button
             className="Take-Final-Assessment"  style={{ display: (id === courses.length - 1 && !(completedcourses.includes(course))) ? "inline" : "none" }}
              onClick={() => navigate("/final-assesment")}
            >
              Take Final Assessment
            </button>

            <button className="Take-Final-Assessment"
              style={{ display: completedcourses.includes(course) ? "inline" : "none" }}
              onClick={() => navigate("/certificate")}
            >
              Generate Certificate
            </button>
          </div>
        ) : (
        <p></p>
        )};
      </div>
      <Chatbot />
    </div>
  );
};

export default Profile;
