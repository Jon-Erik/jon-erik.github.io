import React, { useEffect } from "react"
import { connect } from 'react-redux'
import { useLocation } from "react-router-dom"

import PageContentWrapper from "../../components/PageContentWrapper"
import Header from "../../components/Header"
import SubHeader from "../../components/SubHeader"
import ButtonLink from "../../components/ButtonLink"
import { externalData as externalDataState } from "../../state"

import "./Resume.styl"

const { fetchSoftwareResumeData } = externalDataState

function SoftwareResume({
    softwareResumeData,
    softwareResumeDataLoading,
    softwareResumeDataError,
    onFetchSoftwareResumeData,
	navbarData,
    navbarDataLoading,
    navbarDataError
}) {
    const { mainHeader, education, workExperience } = softwareResumeData
    const { pathname } = useLocation()

    const softwareLink = navbarData.find(d => d.route.startsWith("/" + pathname.split("/")[1]))

    useEffect(() => {
        if (!Object.keys(softwareResumeData).length) {
            onFetchSoftwareResumeData()
        }
    }, [])

	return (
		<PageContentWrapper loading={softwareResumeDataLoading || navbarDataLoading}>
			<div className="software-resume">
                <Header text={mainHeader}/>
                <div className="imported-html" dangerouslySetInnerHTML={{ __html: workExperience}}/>
                <div className="imported-html" dangerouslySetInnerHTML={{ __html: education}}/>
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
        softwareResumeData: state.externalData.softwareResumeData,
        softwareResumeDataLoading: state.externalData.softwareResumeDataLoading,
        softwareResumeDataError: state.externalData.softwareResumeDataError,
		navbarData: state.externalData.navbarData,
        navbarDataLoading: state.externalData.navbarDataLoading,
        navbarDataError: state.externalData.navbarDataError
    }
}

const mapDispatch = dispatch => ({
    onFetchSoftwareResumeData: () => dispatch(fetchSoftwareResumeData())
})

export default connect(mapState, mapDispatch)(SoftwareResume);