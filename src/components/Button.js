import React from "react"
import { Link } from "react-router-dom"

import "./Button.styl"

export default function Button({onClick, text}) {
    return (
        <Link className="button" onClick={onClick}>{text}</Link>
    )
}