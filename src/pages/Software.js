import React, { useEffect } from "react"
import { connect } from 'react-redux'
import { useLocation } from "react-router-dom"

import PageContentWrapper from "../components/PageContentWrapper"
import Header from "../components/Header"
import ParagraphText from "../components/ParagraphText"
import ButtonLink from "../components/ButtonLink"
import { wixData as wixDataState } from "../state"

import "./Software.styl"

const { fetchSoftwareData } = wixDataState

function Software({
    softwareData,
    softwareDataLoading,
    softwareDataError,
    onFetchSoftwareData,
	navbarData,
    navbarDataLoading,
    navbarDataError
}) {
    const { mainHeader, description } = softwareData
    const { pathname } = useLocation()

    const softwareLink = navbarData.find(d => d.route.startsWith(pathname))

    useEffect(() => {
        if (!Object.keys(softwareData).length) {
            onFetchSoftwareData()
        }
    }, [])

	return (
		<PageContentWrapper loading={softwareDataLoading || navbarDataLoading} centerChildren={true}>
			<div className="software">
                <Header text={mainHeader}/>
                <ParagraphText text={description}/>
                <div className="links">
                    {softwareLink && softwareLink.children.map(d => <ButtonLink key={d.route} route={d.route} text={d.title}/>)}
                </div>
    		</div>
		</PageContentWrapper>
	)
}

const mapState = state => {
    return {
        softwareData: state.wixData.softwareData,
        softwareDataLoading: state.wixData.softwareDataLoading,
        softwareDataError: state.wixData.softwareDataError,
		navbarData: state.wixData.navbarData,
        navbarDataLoading: state.wixData.navbarDataLoading,
        navbarDataError: state.wixData.navbarDataError
    }
}

const mapDispatch = dispatch => ({
    onFetchSoftwareData: () => dispatch(fetchSoftwareData())
})

export default connect(mapState, mapDispatch)(Software);