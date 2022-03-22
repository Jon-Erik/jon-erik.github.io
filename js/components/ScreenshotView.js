import React, { useRef } from "react"
import "./ScreenshotView.styl"

export default function ScreenshotView({ src, caption }) {
	const imgRef = useRef()
	let captionWidth = "auto"
	if (imgRef && imgRef.current) {
		captionWidth = `${imgRef.current.clientWidth}px`
	}
	return (
		<div className="ScreenshotView">
			<img src={src} alt={caption} ref={imgRef} />
			<div className="caption" style={{ width: captionWidth }}>
				<i>{caption}</i>
			</div>
		</div>
	)
}
