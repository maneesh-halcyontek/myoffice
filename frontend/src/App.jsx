import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Apply from './pages/Apply'
import AddUser from './pages/AddUser'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<div>About Page</div>} />
        <Route path="/job-application" element={<Apply/>} />
        <Route path='/user-add' element={<AddUser/> } ></Route>
      </Routes>
      <Footer/>
    </Router>
      
    </>
  )
}

export default App
