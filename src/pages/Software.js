import React, { useEffect } from "react"
import { connect } from 'react-redux'
import { useLocation } from "react-router-dom"

import PageContentWrapper from "../components/PageContentWrapper"
import Header from "../components/Header"
import ParagraphText from "../components/ParagraphText"
import ButtonLink from "../components/ButtonLink"
import { externalData as externalDataState } from "../state"

import "./Software.styl"

const { fetchSoftwareData } = externalDataState

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
        softwareData: state.externalData.softwareData,
        softwareDataLoading: state.externalData.softwareDataLoading,
        softwareDataError: state.externalData.softwareDataError,
		navbarData: state.externalData.navbarData,
        navbarDataLoading: state.externalData.navbarDataLoading,
        navbarDataError: state.externalData.navbarDataError
    }
}

const mapDispatch = dispatch => ({
    onFetchSoftwareData: () => dispatch(fetchSoftwareData())
})

export default connect(mapState, mapDispatch)(Software);