import React from "react"
import { connect } from 'react-redux'
import { useLocation } from "react-router-dom"
import { useSinglePrismicDocument } from '@prismicio/react'
import { asHTML } from '../../services/prismic'

import PageContentWrapper from "../../components/PageContentWrapper"
import Header from "../../components/Header"
import SubHeader from "../../components/SubHeader"
import ButtonLink from "../../components/ButtonLink"

import "./Resume.styl"


function SoftwareResume({
    onFetchSoftwareResumeData,
	navbarData,
    navbarDataLoading,
    navbarDataError
}) {
    const [ softwareResumeData, softwareResumeLoading ] = useSinglePrismicDocument('software_resume')
    const main_header_html = asHTML(softwareResumeData && softwareResumeData.data.main_header)
    const education_html = asHTML(softwareResumeData && softwareResumeData.data.education)
    const work_experience_html = asHTML(softwareResumeData && softwareResumeData.data.work_experience)

    const { pathname } = useLocation()
    const softwareLink = navbarData.find(d => d.route.startsWith("/" + pathname.split("/")[1]))
    const loading = navbarDataLoading || !softwareResumeLoading || softwareResumeLoading.state !== "loaded"

	return (
		<PageContentWrapper loading={loading}>
			<div className="software-resume">
                <Header text={main_header_html}/>
                <div className="imported-html" dangerouslySetInnerHTML={{ __html: work_experience_html}}/>
                <div className="imported-html" dangerouslySetInnerHTML={{ __html: education_html}}/>
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
		navbarData: state.externalData.navbarData,
        navbarDataLoading: state.externalData.navbarDataLoading,
        navbarDataError: state.externalData.navbarDataError
    }
}

const mapDispatch = dispatch => ({})

export default connect(mapState, mapDispatch)(SoftwareResume);