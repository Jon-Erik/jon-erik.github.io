import React, { useState } from "react"

import "./Chevron.styl"

export default function Chevron({
	direction = "right",
	onPress,
	className,
	disabled,
}) {
	const [timeInt, setTimeInt] = useState(null)

	// onPress will be called continuously while mouse btn
	// is held down over the chevron
	function startScroll() {
		onPress()
		clearInterval(timeInt)
		setTimeInt(setInterval(onPress, 15))
	}

	function stopScroll() {
		clearInterval(timeInt)
	}

	return (
		<div
			className={`Chevron ${disabled ? "disabled" : null}`}
			onMouseDown={startScroll}
			onMouseUp={stopScroll}
			onTouchStart={startScroll}
			onTouchEnd={stopScroll}
		>
			<div className="icon">
				{direction === "right" ? (
					<i className="fas fa-chevron-right"></i>
				) : (
					<i className="fas fa-chevron-left"></i>
				)}
			</div>
		</div>
	)
}
