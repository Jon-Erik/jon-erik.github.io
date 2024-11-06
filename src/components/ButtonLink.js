import React from "react"
import { Link } from "react-router-dom"

import "./ButtonLink.styl"

export default function ButtonLink({route, text}) {
    return (
        <Link className="button-link" to={route}>{text}</Link>
    )
}