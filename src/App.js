import React from 'react'
import "./App.styl"

import {
    createHashRouter,
    RouterProvider,
    Route,
    Routes,
    HashRouter,
    createHashRouter
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

import Navbar from "./components/navbar"
import Footer from "./components/footer"

loadData("homepage")

const router = createHashRouter([
    {
      path: "/",
      element: <Homepage/>
    },
    {
      path: "/software",
      element: <Software/>
    },
    {
      path: "/software/resume",
      element: <SoftwareResume/>
    },
    {
      path: "/software/technologies",
      element: <SoftwareTechnologies/>
    },
    {
      path: "/music",
      element: <Music/>
    },
    {
      path: "/music/resume",
      element: <MusicResume/>
    },
    {
      path: "/music/resources",
      element: <MusicResources/>
    },
    {
      path: "/music/events",
      element: <MusicEvents/>
    },
    {
      path: "/*",
      element: <NotFound/>
    }
  ])
  
  function App() {
    return (
        <div className="app-wrapper">
            <Navbar/>
            <RouterProvider router={router} />
            <Footer/>
        </div>
    );
}

export default App;
{/* <HashRouter>
    <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/software" element={<Software />} />
    </Routes>
    </HashRouter> */}