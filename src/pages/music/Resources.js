import React from "react"
import { connect } from 'react-redux'
import { useLocation } from "react-router-dom"
import { useSinglePrismicDocument } from '@prismicio/react'
import { asHTML } from '../../services/prismic'

import PageContentWrapper from "../../components/PageContentWrapper"
import Header from "../../components/Header"
import ButtonLink from "../../components/ButtonLink"

import "./Resume.styl"
import ParagraphText from "../../components/ParagraphText"


function MusicResources({
	navbarData,
    navbarDataLoading,
    navbarDataError
}) {
    const [ musicResourcesRootData, musicResourcesRootLoading ] = useSinglePrismicDocument('music_resources_root')
    const main_header_html = asHTML(musicResourcesRootData && musicResourcesRootData.data.main_header)
    const description_html = asHTML(musicResourcesRootData && musicResourcesRootData.data.description)
    
    const { pathname } = useLocation()
    const musicLink = navbarData.find(d => d.route.startsWith("/" + pathname.split("/")[1]))
    const loading = navbarDataLoading || !musicResourcesRootLoading || musicResourcesRootLoading.state !== "loaded"

	return (
		<PageContentWrapper loading={loading}>
			<div className="software-resume">
                <Header html={main_header_html}/>
                <ParagraphText html={description_html}/>
                 <div className="links">
                    {musicLink && musicLink.children
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

export default connect(mapState, mapDispatch)(MusicResources);