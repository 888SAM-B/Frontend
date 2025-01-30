import './App.css'
import {Routes,Route} from 'react-router-dom'
import Home from './home'
import Profile from './profile'
import Register from './register'
import Login from './login'
import InitialTest from './InitialTest'
import Test from './test'
import Certificate from './certificate'
import FinalTest from './FinalAssesment'
import Chatbot from './chatbot'
function App() {
  return (
   <div>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/test" element={<Test/>}/>
        <Route path="/initial-test" element={<InitialTest/>}/>
        <Route path="/certificate" element={<Certificate/>}/>
        <Route path="/final-assesment" element={<FinalTest/>}/>
        <Route path="/chat" element={<Chatbot/>}/>
      </Routes>
    </div>
  )
}
export default App;