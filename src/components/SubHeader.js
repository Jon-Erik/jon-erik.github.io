import React from "react"

import "./SubHeader.styl"

export default function SubHeader({html}) {
    return <div className="sub-header" dangerouslySetInnerHTML={{ __html: html}} />
}