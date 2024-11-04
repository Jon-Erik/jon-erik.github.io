import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import store from "../app/store"

import "./navbar.styl"
import { loadData } from "../services/wixAPI"
import { 
    setNavbarData, 
    toggleNavbarLoading, 
    setHomepageData, 
    homepageDataLoading 
} from '../features/wixData/wixDataSlice'

function Navbar() {
    const navbarData = useSelector((state) => state.navbarData)
    const navbarDataLoading = useSelector((state) => state.navbarDataLoading)
    const homepageData = useSelector((state) => state.homepageData)
    const homepageDataLoading = useSelector((state) => state.homepageDataLoading)
    const dispatch = useDispatch()

    async function getData() {
        if (!navbarData || navbarData.length == 0) {
            const rawNavbarData = await loadData("navbar-links")
            console.log(rawNavbarData)
            store.dispatch(setNavbarData(rawNavbarData.dataItems))
            console.log(navbarData)

        }
    }

    useEffect(() => {
        getData()
    }, [])

    console.log(navbarData)

    return <div className="navbar">
        Navbar
        {navbarData && navbarData.map(d => <span>d.id</span>)}
    </div>
}

export default Navbar;