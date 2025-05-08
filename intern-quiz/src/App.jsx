import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home.jsx'
import Ques from './components/Questions.jsx'
import Result from './components/Result.jsx'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<Ques />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </Router>
  )
}

export default App;
