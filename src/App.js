import React from 'react'
import './App.styl'

import { Route, Routes, BrowserRouter } from 'react-router'

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
            <Route path="/">
              <Route path="*" element={<NotFound />} />
            </Route>
            <Route path="/software" element={<Software />} />
            <Route path="/software">
              <Route path="resume" element={<SoftwareResume />} />
              <Route path="technologies" element={<SoftwareTechnologies />} />
            </Route>
            <Route path="/music" element={<Music />} />
            <Route path="/music">
              <Route path="resume" element={<MusicResume />} />
              <Route path="resources" element={<MusicResources />} />
              <Route path="events" element={<MusicEvents />} />
              <Route path="via-musicae" element={<MusicViaMusicae />} />
            </Route>
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App
