import React from "react"
import Loader from "./Loader"

import "./PageContentWrapper.styl"

export default function PageContentWrapper({ loading, children, centerChildren }) {
    return (
        <div className={`page-content-wrapper ${loading ? "loading" : ""}`}>
            {loading ? (
                <Loader/>
            ) : <div className={`children ${centerChildren ? "vertical-center-content" : ""}`}>{children}</div>}
        </div>
    )
}