import React, { useEffect } from "react"
import { connect } from 'react-redux'
import { useLocation } from "react-router-dom"

import PageContentWrapper from "../../components/PageContentWrapper"
import Header from "../../components/Header"
import SubHeader from "../../components/SubHeader"
import ButtonLink from "../../components/ButtonLink"
import { externalData as externalDataState } from "../../state"

import "./Resume.styl"

const { fetchMusicResourcesData } = externalDataState

function MusicResume({
    musicResourcesData,
    musicResourcesDataLoading,
    musicResourcesDataError,
    onFetchMusicResourcesData,
	navbarData,
    navbarDataLoading,
    navbarDataError
}) {
    // const { mainHeader, education, performanceExperience } = musicResourcesData
    const { pathname } = useLocation()

    const musicLink = navbarData.find(d => d.route.startsWith("/" + pathname.split("/")[1]))

    useEffect(() => {
        if (!Object.keys(musicResourcesData).length) {
            onFetchMusicResourcesData()
        }
    }, [])

	return (
		<PageContentWrapper loading={musicResourcesDataLoading || navbarDataLoading}>
			<div className="software-resume">
                <Header text={"Music > Resources"}/>
                {/*<div className="imported-html" dangerouslySetInnerHTML={{ __html: performanceExperience}}/>
                <div className="imported-html" dangerouslySetInnerHTML={{ __html: education}}/>
                 <div className="links">
                    {musicLink && musicLink.children
                        .filter(d => d.route !== pathname)
                        .map(d => <ButtonLink key={d.route} route={d.route} text={`View ${d.title}`}/>)
                    }
                </div>  */}
    		</div>
		</PageContentWrapper>
	)
}

const mapState = state => {
    return {
        musicResourcesData: state.externalData.musicResourcesData,
        musicResourcesDataLoading: state.externalData.musicResourcesDataLoading,
        musicResourcesDataError: state.externalData.musicResourcesDataError,
		navbarData: state.externalData.navbarData,
        navbarDataLoading: state.externalData.navbarDataLoading,
        navbarDataError: state.externalData.navbarDataError
    }
}

const mapDispatch = dispatch => ({
    onFetchMusicResourcesData: () => dispatch(fetchMusicResourcesData())
})

export default connect(mapState, mapDispatch)(MusicResume);