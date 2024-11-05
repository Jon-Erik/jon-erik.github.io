import React from 'react'
import "./App.styl"

import {
    Route,
    Routes,
    HashRouter,
} from "react-router-dom"

import { loadData } from "./services/wixAPI"

import Homepage from './pages/Homepage'
import Music from './pages/Music'
import MusicResume from "./pages/music/Resume"
import MusicEvents from "./pages/music/Events"
import MusicResources from "./pages/music/Resources"
import Software from './pages/Software'
import SoftwareResume from "./pages/software/Resume"
import SoftwareTechnologies from "./pages/software/Technologies"
import NotFound from "./pages/NotFound"

import Navbar from "./components/Navbar"
import Footer from "./components/Footer"

loadData("homepage")
  
function App() {
  return (
      <div>
        <HashRouter>
          <Navbar/>
          <div className="app-wrapper">
            <Routes>
              <Route path="/" element={<Homepage/>}/>
              <Route path="/software" element={<Software/>}/>
              <Route path="/software/resume" element={<SoftwareResume/>}/>
              <Route path="/software/technologies" element={<SoftwareTechnologies/>}/>
              <Route path="/music" element={<Music/>}/>
              <Route path="/music/resume" element={<MusicResume/>}/>
              <Route path="/music/resources" element={<MusicResources/>}/>
              <Route path="/music/events" element={<MusicEvents/>}/>
              <Route path="/*" element={<NotFound/>}/>
            </Routes>
          </div>
          <Footer/>
        </HashRouter>
      </div>
  );
}

export default App;