import React, { useEffect } from "react"
import { connect } from 'react-redux'
import { useLocation } from "react-router-dom"

import PageContentWrapper from "../components/PageContentWrapper"
import Header from "../components/Header"
import ParagraphText from "../components/ParagraphText"
import ButtonLink from "../components/ButtonLink"
import { externalData as externalDataState } from "../state"

import "./Software.styl"

const { fetchMusicData } = externalDataState

function Software({
    musicData,
    musicDataLoading,
    musicDataError,
    onFetchMusicData,
	navbarData,
    navbarDataLoading,
    navbarDataError
}) {
    const { mainHeader, description } = musicData
    const { pathname } = useLocation()

    const softwareLink = navbarData.find(d => d.route.startsWith(pathname))

    useEffect(() => {
        if (!Object.keys(musicData).length) {
            onFetchMusicData()
        }
    }, [])

	return (
		<PageContentWrapper loading={musicDataLoading || navbarDataLoading} centerChildren={true}>
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
        musicData: state.externalData.musicData,
        musicDataLoading: state.externalData.musicDataLoading,
        musicDataError: state.externalData.musicDataError,
		navbarData: state.externalData.navbarData,
        navbarDataLoading: state.externalData.navbarDataLoading,
        navbarDataError: state.externalData.navbarDataError
    }
}

const mapDispatch = dispatch => ({
    onFetchMusicData: () => dispatch(fetchMusicData())
})

export default connect(mapState, mapDispatch)(Software);