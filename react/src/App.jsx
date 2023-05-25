import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from './layout/header/header'
import Home from './components/home/home'
import Album from './components/albums/albums'
import Projects from './components/projects/projects'

export default function App() {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/albums" element={<Album />} />
        <Route path="/projects" element={<Projects />} />
      </Routes>
    </Router>
  );
}
