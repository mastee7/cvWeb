import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './components/home/home'
import Projects from './components/projects/projects'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={< Home />}/>
        <Route path="/projects" element={< Projects />}/>
      </Routes>
    </Router>
  );
}
