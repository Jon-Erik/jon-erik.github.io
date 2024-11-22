import React from "react"
import { connect } from 'react-redux'
import { useLocation } from "react-router-dom"
import { useSinglePrismicDocument } from '@prismicio/react'

import PageContentWrapper from "../components/PageContentWrapper"
import Header from "../components/Header"
import ParagraphText from "../components/ParagraphText"
import ButtonLink from "../components/ButtonLink"

import "./Software.styl"


function Software({
	navbarData,
    navbarDataLoading,
    navbarDataError
}) {
    const [ softwareRootData, softwareRootLoading ] = useSinglePrismicDocument('software_root')
    const main_header = softwareRootData && softwareRootData.data.main_header[0].text
    const description = softwareRootData && softwareRootData.data.description[0].text
    const { pathname } = useLocation()

    const softwareLink = navbarData.find(d => d.route.startsWith(pathname))
    const loading = navbarDataLoading || !softwareRootLoading || softwareRootLoading.state !== "loaded"


	return (
		<PageContentWrapper loading={loading} centerChildren={true}>
			<div className="software">
                <Header text={main_header}/>
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
		navbarData: state.externalData.navbarData,
        navbarDataLoading: state.externalData.navbarDataLoading,
        navbarDataError: state.externalData.navbarDataError
    }
}

const mapDispatch = dispatch => ({})

export default connect(mapState, mapDispatch)(Software);