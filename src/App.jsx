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
import Loading from './loading'
import Chatbot from './chatbot'
import FullscreenLock from './FullscreenLock'
import FullscreenButton from './FullscreenButton'
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
        <Route path="/load" element={<Loading/>}/>
        <Route path="/fs" element={<FullscreenLock/>}/>
        <Route path="/fsb" element={<FullscreenButton/>}/>
      </Routes>
    </div>
  )
}
export default App;