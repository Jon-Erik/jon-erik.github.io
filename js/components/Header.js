import React from "react"
import "./Header.styl"

export default function Header() {
	return (
		<div className="Header">
			<div className="links">
				<a href="#profile">Profile</a>
				<a href="#projects">Projects</a>
				<a href="#contact">Contact</a>
			</div>
			<div className="icons">
				<a rel="noreferrer" href="https://github.com/Jon-Erik" target="_blank">
					<i className="fab fa-github"></i>
				</a>
				<a
					rel="noreferrer"
					href="https://www.linkedin.com/in/jon-erik-chandler/"
					target="_blank"
				>
					<i className="fab fa-linkedin-in"></i>
				</a>
			</div>
		</div>
	)
}
