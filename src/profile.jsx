import React, { useState, useEffect } from "react";
import  Chatbot from './chatbot'
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
  const [id, setId] = useState(0);
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
          // setState(result.user.state);
          setId(result.user.state)
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
        setId(state); // Set ID to saved state
      }
    }
  }, [courses, completedcourses, course, state]);

  const handleNext = async () => {
    setId((prevId) => (prevId < courses.length - 1 ? prevId + 1 : prevId));
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("https://mainbackend.up.railway.app/save-current-state", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          currentstate: id + 1,
        }),
      });
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error("Error saving results:", error);
      alert("Error saving results.");
    }
  };

  const handlePrevious = () => {
    setId((prevId) => (prevId > 0 ? prevId - 1 : prevId));
  };

  const progress = courses.length > 0 ? (id / (courses.length - 1)) * 100 : 0;

  return (
    <div className="body41">
    <div className="profile-container">
      <h1 className="profile-title">Profile</h1>
      <p className="profile-info">
        <strong className="profile-label">First Name:</strong> {userData.firstname}
      </p>
      <p className="profile-info">
        <strong className="profile-label">Last Name:</strong> {userData.lastname}
      </p>
      <p className="profile-info">
        <strong className="profile-label">Username:</strong> {userData.username}
      </p>
      <p className="profile-info">
        <strong className="profile-label">Completed Courses:</strong>{" "}
        {completedcourses.join(", ")}
      </p>

      <h2 className="courses-title">Courses</h2>
      {error && <p className="error-message">Error: {error}</p>}
      {courses.length > 0 ? (
        <div className="courses-container">
          <div className="progress-container">
            <div className="progress-bar-background">
              <div
                className="progress-bar-filled"
                style={{
                  width: `${progress}%`,
                }}
              ></div>
            </div>
            <p className="progress-text">{Math.round(progress)}% completed</p>
          </div>

          <h2 className="module-title">{courses[id]?.module || "Loading..."}</h2>
          <h3 className="course-title">
            {id + 1}. {courses[id]?.title || "Loading..."}
          </h3>
          <p className="course-content">{courses[id]?.content || "Loading..."}</p>
          <button
            className="course-button"
            onClick={handlePrevious}
            disabled={id === 0}
          >
            Back
          </button>
          <button
            className="course-button"
            onClick={handleNext}
            disabled={id === courses.length - 1}
          >
            Next
          </button>
          <button
            style={{ display: id === courses.length - 1 ? "inline" : "none" }}
            onClick={() => navigate("/final-assesment")}
          >
            Take Final Assessment
          </button>
        </div>
      ) : (
        <p className="no-courses">Loading......</p>
      )}

    </div>
    <Chatbot/>
    </div>
  );
};

export default Profile;
