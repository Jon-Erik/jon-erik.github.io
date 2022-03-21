import React from "react"
import {
	BrowserRouter as Router,
	Route,
	Navigate,
	Routes,
	useLocation,
} from "react-router-dom"

import Header from "./components/Header"
import Footer from "./components/Footer"
import Title from "./components/Title"
import Profile from "./components/Profile"
import Projects from "./components/Projects"
import Contact from "./components/Contact"

import "./App.styl"

export default function App() {
	return (
		<div className="App">
			<div className="AppContent">
				<Header />
				<Title />
				<Profile />
				<Projects />
				<Contact />
			</div>
			<Footer />
		</div>
	)
}
