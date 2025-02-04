import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const Register = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate=useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = { firstname, lastname, username, password };
    try {
      const response = await fetch("http://localhost:8001/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        navigate("/login");
        const result = await response.json();
        alert(result.message);
        // Reset all fields
        setFirstname("");
        setLastname("");
        setUsername("");
        setPassword("");
      } else {
        const err=await response.json();
        alert(err.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div class="body2"  >
    <div class="registration-container">
  <h2 class="form-heading" data-aos="fade-up">Register</h2>
  <form onSubmit={handleSubmit}>
    <div class="input-group personal-info">
      <label class="input-label">Firstname:</label>
      <input
        class="input-field firstname"
        type="text"
        value={firstname}
        onChange={(e) => setFirstname(e.target.value)}
        required
      />
      <br />
      <br />
      <label class="input-label">Lastname:</label>
      <input
        class="input-field lastname"
        type="text"
        value={lastname}
        onChange={(e) => setLastname(e.target.value)}
        required
      />
      <br />
      <br />
      <label class="input-label">Username:</label>
      <input
        class="input-field username"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <br />
      <br />
    </div>
    <div class="input-group password-info">
      <label class="input-label">Password:</label>
      <input
        class="input-field password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <br />
      <br />
    </div>
    <button class="submit-button" type="submit">Register</button>
  </form>
</div>




</div>

  );
};

export default Register;
