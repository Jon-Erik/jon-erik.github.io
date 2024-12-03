import React from "react"
import { connect } from 'react-redux'
import { useLocation } from "react-router-dom"
import { useSinglePrismicDocument, useAllPrismicDocumentsByType } from '@prismicio/react'
import { asHTML } from '../../services/prismic'

import PageContentWrapper from "../../components/PageContentWrapper"
import Header from "../../components/Header"
import ButtonLink from "../../components/ButtonLink"

import "./Resources.styl"
import ParagraphText from "../../components/ParagraphText"


function MusicResources({
	navbarData,
    navbarDataLoading,
    navbarDataError
}) {
    const [ musicResourcesRootData, musicResourcesRootLoading ] = useSinglePrismicDocument('music_resources_root')
    const main_header_html = asHTML(musicResourcesRootData && musicResourcesRootData.data.main_header)
    const description_html = asHTML(musicResourcesRootData && musicResourcesRootData.data.description)

    const [ musicResourcesData, musicResourcesLoading ] = useAllPrismicDocumentsByType('music_resource')
    
    const { pathname } = useLocation()
    const musicLink = navbarData.find(d => d.route.startsWith("/" + pathname.split("/")[1]))
    const loading = navbarDataLoading || 
        !musicResourcesRootLoading || musicResourcesRootLoading.state !== "loaded" ||
        !musicResourcesLoading || musicResourcesLoading.state !== "loaded"

	return (
		<PageContentWrapper loading={loading}>
			<div className="music-resources">
                <Header html={main_header_html}/>
                <ParagraphText html={description_html}/>

                {musicResourcesData && musicResourcesData.map((r, i) => 
                    <OneResource 
                        key={i}
                        title={r.data.title} 
                        media_attachment={r.data.media_attachment} 
                        main_content={r.data.main_content}
                    />
                )}

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

function OneResource({main_content, media_attachment, title}) {
    const main_content_html = asHTML(main_content)
    const title_html = asHTML(title)
    const { name: linkName, url: linkURL } = media_attachment

    return (
        <div className="one-resource">
            <Header html={title_html}/>
            <ParagraphText html={main_content_html}/>
            <div className="resource-link">
                <a href={linkURL} target="__blank">{linkName}</a>
            </div>
        </div>
    )
}