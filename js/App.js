import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

import Header from "./components/Header"
import Footer from "./components/Footer"
import Title from "./components/Title"
import Profile from "./components/Profile"
import Projects from "./components/Projects"
import Contact from "./components/Contact"
import PowerToolRepair from "./components/PowerToolRepair"
import TaskMgmtApp from "./components/TaskMgmtApp"

import "./App.styl"

export default function App() {
	return (
		<div className="App">
			<Header />
			<div className="AppContent">
				<Router>
					<Routes>
						<Route
							path="/"
							element={
								<div>
									<Title />
									<Profile />
									<Projects />
									<Contact />
								</div>
							}
						/>
						<Route
							path="projects/power-tool-repair"
							element={<PowerToolRepair />}
						/>
						<Route path="projects/task-mgmt-app" element={<TaskMgmtApp />} />
					</Routes>
				</Router>
			</div>
			<Footer />
		</div>
	)
}
