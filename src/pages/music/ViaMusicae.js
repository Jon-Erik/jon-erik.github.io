import React, { useEffect, useState } from "react"
import { connect } from 'react-redux'
import { useLocation } from "react-router-dom"
import { useSinglePrismicDocument, useAllPrismicDocumentsByType } from '@prismicio/react'
import { asHTML } from '../../services/prismic'
import { getBlogPosts } from '../../services/blogger'
import fecha from "fecha"

import PageContentWrapper from "../../components/PageContentWrapper"
import Header from "../../components/Header"
import ButtonLink from "../../components/ButtonLink"
import Button from "../../components/Button"
import Loader from "../../components/Loader"

import "./ViaMusicae.styl"
import ParagraphText from "../../components/ParagraphText"


function ViaMusicae({
	navbarData,
    navbarDataLoading,
    navbarDataError
}) {
    const [ viaMusicaeRootData, viaMusicaeRootLoading ] = useSinglePrismicDocument('via_musicae_root')
    const main_header_html = asHTML(viaMusicaeRootData && viaMusicaeRootData.data.main_header)
    const description_html = viaMusicaeRootData && viaMusicaeRootData.data.description[0].text
    
    const [ nextPageToken, setNextPageToken ] = useState("")
    const [ loadingPosts, setLoadingPosts ] = useState(false)
    const [ posts, setPosts ] = useState([])

    //const [ viaMusicaeData, viaMusicaeLoading ] = useAllPrismicDocumentsByType('music_resource')
    
    const { pathname } = useLocation()
    const musicLink = navbarData.find(d => d.route.startsWith("/" + pathname.split("/")[1]))
    const loading = navbarDataLoading || 
        !viaMusicaeRootLoading || viaMusicaeRootLoading.state !== "loaded" //||
        //!viaMusicaeLoading || viaMusicaeLoading.state !== "loaded"

    async function getPosts() {
        console.log("getting")
        setLoadingPosts(true)

        const { items, nextPageToken: newToken } = await getBlogPosts(nextPageToken);
        setNextPageToken(newToken)
        const newPosts = posts.concat(items);
        setPosts(newPosts)

        setLoadingPosts(false)
    }

    useEffect(() => {
        getPosts()
    }, [])

	return (
		<PageContentWrapper loading={loading}>
			<div className="via-musicae">
                <Header html={main_header_html}/>
                <ParagraphText html={description_html}/>

                {posts.map(p => <OnePost {...p} />)}

                {!loadingPosts && 
                    <div className="load-more">
                        {nextPageToken ? (
                            <Button text="Load more" onClick={getPosts}/>
                        ) : (
                            <i>All posts loaded.</i>
                        )}
                    </div>
                }

                {loadingPosts && <Loader/>}

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

export default connect(mapState, mapDispatch)(ViaMusicae);

function OnePost({ title, url, content: content_html, published }) {
    const date_and_time_parsed = fecha.format(new Date(published), "D MMMM YYYY")

    return (
        <div className="one-post">
            <h2>{title}</h2>
            <ParagraphText html={content_html}/>
            <p className="date-stamp"><i>
                {date_and_time_parsed}<br/>
                View original post <a href={url} className="post-link" target="__blank">here</a>
            </i></p>
           <hr/>
        </div>
    )
}