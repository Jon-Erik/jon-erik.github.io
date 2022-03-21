import React from "react"
import "./Contact.styl"

export default function Contact() {
	return (
		<div className="Contact" id="contact">
			<h1>Contact</h1>
			<p>Phone: 202-657-1489</p>
			<p>Email: jonerik.chandler@gmail.com</p>
			<p>
				LinkedIn:{" "}
				<a
					rel="noreferrer"
					href="https://www.linkedin.com/in/jon-erik-chandler/"
					target="_blank"
				>
					linkedin.com/in/jon-erik-chandler/
				</a>
			</p>
		</div>
	)
}
