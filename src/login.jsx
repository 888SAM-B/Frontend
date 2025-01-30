import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");  // To display error messages
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = { username: userName, password: userPassword };

    try {
      const response = await fetch("https://mainbackend.up.railway.app/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      
      if (response.ok) {
        // Successful login, store the token and navigate to the profile page
        localStorage.setItem("token", result.token); // Save token in localStorage
        if(result.i_status==0){
        navigate("/initial-test");  // Navigate to profile page
      }
      else{
        navigate("/profile")
      }
      } else {
        setErrorMessage(result.message || "Login failed. Please try again.");  // Show error message
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("Something went wrong. Please try again later.");
    }
  };

  return (
    <div class="body2"  >
    <div class="registration-container">
      <h1 class="form-heading"  >Login</h1>
      <form onSubmit={handleSubmit}>
        <div class="input-group personal-info">
          <label  class="input-label"   >Username: </label>
          <input  class="input-field firstname"
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
            autoFocus
          />
        </div>
        <div class="input-group password-info"  >
          <label  class="input-label"    >Password: </label>
          <input  class="input-field firstname"
            type="password"
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
            required
          />
        </div>
        <br />
        <button class="submit-button" type="submit">Login</button>
      </form>

      {errorMessage && <div style={{ color: 'red', marginTop: '10px' }}>{errorMessage}</div>}  {/* Display error message if any */}
    </div>
    </div>
  
  );
};

export default Login;
