import React, { useState, useEffect } from "react"
import "./CodeSample.styl"

export default function CodeSample({
	children,
	description,
	title,
	codeTxtFile,
}) {
	const [codeAsTextStr, setCodeAsTextStr] = useState("")

	// Convert text file to string of text
	useEffect(() => {
		if (codeTxtFile) {
			fetch(codeTxtFile)
				.then(r => r.text())
				.then(text => {
					setCodeAsTextStr(text)
				})
		}
	}, [])

	return (
		<div className="CodeSample">
			<h4>{title}</h4>
			<p>{description}</p>
			<div className="code">
				<pre>
					<code>{codeAsTextStr}</code>
				</pre>
			</div>
		</div>
	)
}
