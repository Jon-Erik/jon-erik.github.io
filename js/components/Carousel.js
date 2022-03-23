import React, { useRef, useState } from "react"

import "./Carousel.styl"
import Chevron from "./Chevron"

export default function Carousel({ children }) {
	const carouselRef = useRef()
	const [disabledButton, setDisabledButton] = useState("left")

	// Tracks horizontal scroll changes on touch events
	const [offsetX, setOffsetX] = useState(null)

	function adjustScroll(pixels) {
		// Adjust scroll
		const el = carouselRef.current

		const maxScrollLeft = el.scrollWidth - el.clientWidth
		el.scrollLeft += pixels

		// Determine if a chevron should be disabled
		if (el.scrollLeft <= 0) {
			setDisabledButton("left")
		} else if (Math.ceil(el.scrollLeft) >= maxScrollLeft) {
			setDisabledButton("right")
		} else {
			setDisabledButton(null)
		}
	}

	return (
		<div className="Carousel">
			<div
				className="content"
				ref={carouselRef}
				onTouchStart={e => setOffsetX(e.touches[0].screenX)}
				onTouchMove={e => {
					if (offsetX != null) {
						const newX = e.touches[0].screenX
						const oldX = offsetX
						setOffsetX(newX)
						adjustScroll(Math.round(oldX - newX))
					}
				}}
				onTouchEnd={() => setOffsetX(null)}
			>
				<div className="children">{children}</div>
			</div>
			<div className="btns">
				<div className="scrollBtn">
					<Chevron
						onPress={() => adjustScroll(-15)}
						direction="left"
						disabled={disabledButton === "left"}
						className="leftBtn"
					/>
				</div>
				<div className="scrollBtn">
					<Chevron
						onPress={() => adjustScroll(15)}
						direction="right"
						disabled={disabledButton === "right"}
						className="rightBtn"
					/>
				</div>
			</div>
		</div>
	)
}
