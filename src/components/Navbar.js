import React, { useEffect } from "react"
import { connect } from 'react-redux'
import { Link, useLocation } from "react-router-dom"

import "./Navbar.styl"

import { externalData as externalDataState } from "../state"
import Loader from "./Loader"

const { fetchNavbarData } = externalDataState

export function Navbar({ 
    onFetchNavbarData, 
    navbarData,
    navbarDataLoading,
    navbarDataError
}) {
    const location = useLocation()

    useEffect(() => {
        if (!navbarData.length) {
            onFetchNavbarData()
        }
    }, [])

    if (navbarDataLoading) {
        return <div className="navbar"><Loader size="small"/></div>
    }
    
    return <div className="navbar">
        <div className="links-list">{navbarData.map(d => <NavBarLink key={d.route} linkData={d} currentRoute={location.pathname} />)}</div>
    </div>
}

const mapState = state => {
    return {
        navbarData: state.externalData.navbarData,
        navbarDataLoading: state.externalData.navbarDataLoading,
        navbarDataError: state.externalData.navbarDataError
    }
}

const mapDispatch = dispatch => ({
    onFetchNavbarData: () => dispatch(fetchNavbarData())
})

export default connect(mapState, mapDispatch)(Navbar);

function NavBarLink({ linkData, currentRoute }) {
    const { title, route, children } = linkData
    const active = "/" + currentRoute.split("/")[1] == route

    return <div className={`link ${active ? "active" : ""}`}>
        <Link to={route}>{title}</Link>
        {children.length ? (
            <div className="subnav">
                {children.map(c => <NavBarSubLink key={c.route} linkData={c} currentRoute={currentRoute}/>)}
            </div>
        ) : null}
    </div>
}

function NavBarSubLink({ linkData, currentRoute }) {
    const { title, route } = linkData
    const active = currentRoute == route

    return <div className={`link subnav-link ${active ? "active" : ""}`}>
        <Link to={route}>{title}</Link>
    </div>
}