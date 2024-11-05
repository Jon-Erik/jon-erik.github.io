import React from "react"

import "./Loader.styl"

export function Loader({ size = "large"}) {
    return (
        <div className={`loader-wrapper ${size}`}>
            <div className="loader"/>
        </div>
    )
} 