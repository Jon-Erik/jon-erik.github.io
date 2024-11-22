import React, { useEffect } from "react"
import { connect } from 'react-redux'
import { useLocation } from "react-router-dom"

import PageContentWrapper from "../../components/PageContentWrapper"
import Header from "../../components/Header"
import SubHeader from "../../components/SubHeader"
import ButtonLink from "../../components/ButtonLink"
import { externalData as externalDataState } from "../../state"

import "./Resume.styl"

const { fetchMusicResumeData } = externalDataState

function MusicResume({
    musicResumeData,
    musicResumeDataLoading,
    musicResumeDataError,
    onFetchMusicResumeData,
	navbarData,
    navbarDataLoading,
    navbarDataError
}) {
    const { mainHeader, education, performanceExperience } = musicResumeData
    const { pathname } = useLocation()

    const musicLink = navbarData.find(d => d.route.startsWith("/" + pathname.split("/")[1]))

    useEffect(() => {
        if (!Object.keys(musicResumeData).length) {
            onFetchMusicResumeData()
        }
    }, [])

	return (
		<PageContentWrapper loading={musicResumeDataLoading || navbarDataLoading}>
			<div className="software-resume">
                <Header text={mainHeader}/>
                <div className="imported-html" dangerouslySetInnerHTML={{ __html: performanceExperience}}/>
                <div className="imported-html" dangerouslySetInnerHTML={{ __html: education}}/>
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
        musicResumeData: state.externalData.musicResumeData,
        musicResumeDataLoading: state.externalData.musicResumeDataLoading,
        musicResumeDataError: state.externalData.musicResumeDataError,
		navbarData: state.externalData.navbarData,
        navbarDataLoading: state.externalData.navbarDataLoading,
        navbarDataError: state.externalData.navbarDataError
    }
}

const mapDispatch = dispatch => ({
    onFetchMusicResumeData: () => dispatch(fetchMusicResumeData())
})

export default connect(mapState, mapDispatch)(MusicResume);