import React, { useEffect } from "react"
import { connect } from 'react-redux'
import { Link, useLocation } from "react-router-dom"

import "./Navbar.styl"

import { wixData as wixDataState } from "../state"
import Loader from "./Loader"

const { fetchNavbarData } = wixDataState

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
        <div className="links-list">{navbarData.map(d => <NavBarLink key={d._id} linkData={d} currentRoute={location.pathname} />)}</div>
    </div>
}

const mapState = state => {
    return {
        navbarData: state.wixData.navbarData,
        navbarDataLoading: state.wixData.navbarDataLoading,
        navbarDataError: state.wixData.navbarDataError
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
                {children.map(c => <NavBarSubLink key={c._id} linkData={c} currentRoute={currentRoute}/>)}
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