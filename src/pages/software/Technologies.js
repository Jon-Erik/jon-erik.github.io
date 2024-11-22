import React, { useEffect } from "react"
import { connect } from 'react-redux'
import { useLocation } from "react-router-dom"

import PageContentWrapper from "../../components/PageContentWrapper"
import Header from "../../components/Header"
import SubHeader from "../../components/SubHeader"
import ButtonLink from "../../components/ButtonLink"
import ParagraphText from "../../components/ParagraphText"
import { externalData as externalDataState } from "../../state"

import "./Technologies.styl"

const { fetchSoftwareTechnologiesData } = externalDataState

function SoftwareTechnologies({
    softwareTechnologiesData,
    softwareTechnologiesDataLoading,
    softwareTechnologiesDataError,
    onFetchSoftwareTechnologiesData,
	navbarData,
    navbarDataLoading,
    navbarDataError
}) {
    const { mainHeader, description, textContent } = softwareTechnologiesData
    const { pathname } = useLocation()

    const softwareLink = navbarData.find(d => d.route.startsWith("/" + pathname.split("/")[1]))
    console.log(softwareTechnologiesData)

    useEffect(() => {
        if (!Object.keys(softwareTechnologiesData).length) {
            onFetchSoftwareTechnologiesData()
        }
    }, [])

	return (
		<PageContentWrapper loading={softwareTechnologiesDataLoading || navbarDataLoading}>
			<div className="software-resume">
                <Header text={mainHeader}/>
                <ParagraphText text={description}/>
                <div className="imported-html" dangerouslySetInnerHTML={{ __html: textContent}}/>
                <div className="links">
                    {softwareLink && softwareLink.children
                        .filter(d => d.route !== pathname)
                        .map(d => <ButtonLink key={d.route} route={d.route} text={`View ${d.title}`}/>)
                    }
                </div> 
    		</div>
		</PageContentWrapper>
	)
}

const mapState = state => {
    return {
        softwareTechnologiesData: state.externalData.softwareTechnologiesData,
        softwareTechnologiesDataLoading: state.externalData.softwareTechnologiesDataLoading,
        softwareTechnologiesDataError: state.externalData.softwareTechnologiesDataError,
		navbarData: state.externalData.navbarData,
        navbarDataLoading: state.externalData.navbarDataLoading,
        navbarDataError: state.externalData.navbarDataError
    }
}

const mapDispatch = dispatch => ({
    onFetchSoftwareTechnologiesData: () => dispatch(fetchSoftwareTechnologiesData())
})

export default connect(mapState, mapDispatch)(SoftwareTechnologies);