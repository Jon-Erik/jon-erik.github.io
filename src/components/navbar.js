import React, { useEffect } from "react";
import { connect } from 'react-redux';
import { Link } from "react-router-dom"

import "./navbar.styl"

import { wixData as wixDataState } from "../state"

const { fetchNavbarData } = wixDataState


export function Navbar({ 
    onFetchNavbarData, 
    navbarData,
    navbarDataLoading,
    navbarDataError
}) {
    useEffect(() => {
        if (!navbarData.length) {
            onFetchNavbarData()
        }
    }, [])
    
    return <div className="navbar">
        {navbarData.map(d => <NavBarLink key={d._id} linkData={d} />)}
        <div>navbarDataError: {navbarDataError}</div>
        <div>navbarDataLoading: {navbarDataLoading ? "true" : "false"}</div>
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

function NavBarLink({linkData}) {
    const {title, route, children} = linkData
    return <div>
        <Link to={route}>{title}</Link>
        {children.map(c => <NavBarSubLink key={c._id} linkData={c} />)}
    </div>
}

function NavBarSubLink({linkData}) {
    const {title, route} = linkData
    return <div><Link to={route}>{title}</Link></div>
}