import React from 'react';
import { useNavigate } from 'react-router-dom';
const ContactForm = () => {
    return (
      <div className="main">
      <div className="form-container">
          <form>
              <div className="form-group">
                  <input class="i1" placeholder=" " type="text" id="name" required />
                  <label class="l1" htmlFor="name">Name</label>
              </div>
              <div className="form-group">
                  <input class="i1" placeholder=" " type="email" id="email" required />
                  <label class="l1" htmlFor="email">Email</label>
              </div>
              <div className="form-group">
     <textarea className="texta1" placeholder=" COMMENTS" id="comments" required></textarea>
    
</div>

              <button type="submit" className="form-button">Submit</button>
          </form>
      </div>

      <div className="im">
          <img src="/freepik__background__33528.png" alt="" />
      </div>
  </div>
    );
};

const App = () => {
    const navigate=useNavigate();
    return (
        <div className="homeContainer">
            <div className="heroSection"></div>

            <div className="contentContainer">
                <p className="contentText">
                    <h1 className="homeTitle">WELCOME TO DECODE YOUR COURSE</h1>
                    Coding has become a crucial literacy skill for the present and future generations. It’s natural to wonder about the benefits of learning a new skill and its practical advantages.
                    <br /><br />
                    Learning to code enhances creativity, improves mathematical understanding, and promotes teamwork. The primary aim of the program is to offer comprehensive training in computational programming and coding.
                </p>
                <img className="contentImage" src="/freepik__retouch__76720.png" alt="Illustration of Coding" />
            </div>

            <div className="featuresGrid">
                <div className="featureCard">
                    <h3>Expert Content</h3>
                    <p>Interactive courses tailored to your pace</p>
                    <p>Our expert-curated content ensures an in-depth understanding of key concepts. Whether you're a beginner or an advanced learner, our courses evolve with you.</p>
                </div>
                <div className="featureCard">
                    <h3>Community</h3>
                    <p>Connect with like-minded learners</p>
                    <p>With an active and supportive community, you can engage in discussions, exchange ideas, and collaborate on projects with peers who share your passion.</p>
                </div>
                <div className="featureCard">
                    <h3>Personalized</h3>
                    <p>Learning adapted to your needs</p>
                    <p>Our platform uses intelligent algorithms to personalize your learning experience. Receive tailored recommendations that focus on your goals and progress.</p>
                </div>
            </div>

            <br />

            <div className="buttonContainer">
                <button className="loginButton" 
                onClick={()=>navigate("/login")}
                >LOGIN</button>
                <button className="registerButton"
                onClick={()=>navigate("/register")}
                >REGISTER</button>
            </div>

            <br /><br /><br />

            <ContactForm />
        </div>
    );
};

export default App;
