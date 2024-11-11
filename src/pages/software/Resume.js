import React, { useEffect } from "react"
import { connect } from 'react-redux'
import { useLocation } from "react-router-dom"

import PageContentWrapper from "../../components/PageContentWrapper"
import Header from "../../components/Header"
import SubHeader from "../../components/SubHeader"
import ButtonLink from "../../components/ButtonLink"
import { wixData as wixDataState } from "../../state"

import "./Resume.styl"

const { fetchSoftwareResumeData } = wixDataState

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
                <SubHeader text={"Work Experience"}/>
                <div className="imported-html" dangerouslySetInnerHTML={{ __html: workExperience}}/>
                <SubHeader text={"Education"}/>
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
        softwareResumeData: state.wixData.softwareResumeData,
        softwareResumeDataLoading: state.wixData.softwareResumeDataLoading,
        softwareResumeDataError: state.wixData.softwareResumeDataError,
		navbarData: state.wixData.navbarData,
        navbarDataLoading: state.wixData.navbarDataLoading,
        navbarDataError: state.wixData.navbarDataError
    }
}

const mapDispatch = dispatch => ({
    onFetchSoftwareResumeData: () => dispatch(fetchSoftwareResumeData())
})

export default connect(mapState, mapDispatch)(SoftwareResume);