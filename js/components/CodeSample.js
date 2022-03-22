import React from "react"
import "./CodeSample.styl"

export default function CodeSample({ children, description, title }) {
	return (
		<div className="CodeSample">
			<h4>{title}</h4>
			<p>{description}</p>
			<div className="code">{children}</div>
		</div>
	)
}
