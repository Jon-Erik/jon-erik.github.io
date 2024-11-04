import React, { useEffect } from "react";
import { connect } from 'react-redux';

import "./navbar.styl"

import { wixData as wixDataState } from "../state"

const { fetchNavbarData } = wixDataState


export function Navbar({ onFetchNavbarData }) {

    useEffect(() => {
        onFetchNavbarData()
    }, [])
    
    console.log({wixDataState,})

    return <div className="navbar">
        Navbar
    </div>
}

const mapState = state => {
    return {
        navbarData: state.wixData.navbarData
    };
}

const mapDispatch = dispatch => ({
    onFetchNavbarData: () => dispatch(fetchNavbarData())
})

export default connect(mapState, mapDispatch)(Navbar);