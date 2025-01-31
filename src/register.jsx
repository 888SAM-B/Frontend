import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const Register = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isValid, setIsValid] = useState(null);
  const [focus, setFocus] = useState("none");
  const navigate=useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = { firstname, lastname, username, password };
    try {
      const response = await fetch("https://mainbackend.up.railway.app/register", {
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
        type="email"
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
  className="input-field password"
  type="password"
  minLength={8}
  value={password}
  onFocus={()=>{setFocus("block")}}
  onBlur={()=>{setFocus("none")}}
  onChange={(e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    // Validate password with new value
    const isPasswordValid =
      /^(?=.*\d)(?=.*[\W_])(?=.*[A-Z])(?=.*[a-z]).{8,}$/.test(newPassword);
  
    // Enable only when 9+ characters & valid, disable if 6 or less
    setIsValid(isPasswordValid && newPassword.length >= 8);
  }}
  style={{ borderColor: isValid === false ? "red" : "" }}
  required
/>
<ul style={{ fontSize: "14px" , display:focus,listStyle:"none",fontSize:"16px"}}>
        <li style={{ color: password.length >= 8 ? "green" : "white" }}>
          {password.length >= 8 ? "✔" : "✖"} At least 8 characters
        </li>
        
        <li style={{ color: /[A-Z]/.test(password) ? "green" : "white" }}>
          {/\d/.test(password) ? "✔" : "✖"} At least 1 UpperCase character
        </li>

        <li style={{ color: /[a-z]/.test(password) ? "green" : "white" }}>
          {/\d/.test(password) ? "✔" : "✖"} At least 1 LowerCase character
        </li>

        <li style={{ color: /\d/.test(password) ? "green" : "white" }}>
          {/\d/.test(password) ? "✔" : "✖"} At least 1 number
        </li>
        <li style={{ color: /[\W_]/.test(password) ? "green" : "white" }}>
          {/[\W_]/.test(password) ? "✔" : "✖"} At least 1 special character
        </li>
      </ul>
      <br />
      <br />
    </div>
    <button class="submit-button" type="submit" 
    disabled={!isValid}
    >Register</button>
  </form>
</div>




</div>

  );
};

export default Register;
