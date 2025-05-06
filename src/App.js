import React from 'react'
import './App.styl'

import { Route, Routes, BrowserRouter } from 'react-router-dom'

import Homepage from './pages/Homepage'
import Music from './pages/Music'
import MusicResume from './pages/music/Resume'
import MusicEvents from './pages/music/Events'
import MusicResources from './pages/music/Resources'
import MusicViaMusicae from './pages/music/ViaMusicae'
import Software from './pages/Software'
import SoftwareResume from './pages/software/Resume'
import SoftwareTechnologies from './pages/software/Technologies'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

import Navbar from './components/Navbar'
import Footer from './components/Footer'

function App() {
  return (
    <div className="app-wrapper">
      <BrowserRouter>
        <Navbar />
        <div className="page-content">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/software" element={<Software />} />
            <Route path="/software/resume" element={<SoftwareResume />} />
            <Route
              path="/software/technologies"
              element={<SoftwareTechnologies />}
            />
            <Route path="/music" element={<Music />} />
            <Route path="/music/resume" element={<MusicResume />} />
            <Route path="/music/resources" element={<MusicResources />} />
            <Route path="/music/events" element={<MusicEvents />} />
            <Route path="/music/via-musicae" element={<MusicViaMusicae />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App
