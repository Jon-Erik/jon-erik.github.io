import React, { useEffect, useState } from "react"
import { connect } from 'react-redux'
import { Link, useLocation } from "react-router-dom"
import MenuIcon from '@mui/icons-material/Menu'
import MenuOpenIcon from '@mui/icons-material/MenuOpen'
import CloseIcon from '@mui/icons-material/Close'

import "./Navbar.styl"

import { externalData as externalDataState } from "../state"
import Loader from "./Loader"
import { Menu } from "@mui/material"

const { fetchNavbarData } = externalDataState

export function Navbar({ 
    onFetchNavbarData, 
    navbarData,
    navbarDataLoading,
    navbarDataError
}) {
    const location = useLocation()
    const [ menuExpanded, setMenuExpanded ] = useState(false)

    function toggleMenu(value) {
        const newValue = value !== undefined ? value : !menuExpanded
        setMenuExpanded(newValue)
    }

    useEffect(() => {
        if (!navbarData.length) {
            onFetchNavbarData()
        }
    }, [])

    if (navbarDataLoading) {
        return <div className="navbar"><Loader size="small"/></div>
    }
    
    return <div className="navbar">
        <div className="links-list">
            {navbarData.map(d => <NavBarLink key={d.route} linkData={d} currentRoute={location.pathname} toggleMenu={toggleMenu}/>)}
        </div>
        <div className={`links-list-mobile ${menuExpanded ? "expanded" : ""}`}>
            <div className="mobile-content-wrapper">
                <div>
                    {navbarData.filter(d => d.route != "/").map(d => 
                        <NavBarLink key={d.route} linkData={d} currentRoute={location.pathname} toggleMenu={toggleMenu} />
                    )}
                </div>
                <button type="button" className="menu-toggler" title="Close menu" onClick={() => toggleMenu()}>
                    <CloseIcon />
                </button>
            </div>
        </div>
        <button type="button" className="menu-toggler" title={menuExpanded ? "Close menu" : "Expand menu"} onClick={() => toggleMenu()}>
            {menuExpanded ? <MenuOpenIcon /> : <MenuIcon />}
        </button>
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

function NavBarLink({ linkData, currentRoute, toggleMenu }) {
    const { title, route, children } = linkData
    const active = "/" + currentRoute.split("/")[1] == route

    return <div className={`link ${active ? "active" : ""}`}>
        <Link onClick={() => toggleMenu(false)} to={route}>{title}</Link>
        {children.length ? (
            <div className="subnav">
                {children.map(c => 
                    <NavBarSubLink key={c.route} linkData={c} currentRoute={currentRoute} toggleMenu={toggleMenu} />
                )}
            </div>
        ) : null}
    </div>
}

function NavBarSubLink({ linkData, currentRoute, toggleMenu }) {
    const { title, route } = linkData
    const active = currentRoute == route

    return <div className={`link subnav-link ${active ? "active" : ""}`}>
        <Link onClick={() => toggleMenu(false)} to={route}>{title}</Link>
    </div>
}