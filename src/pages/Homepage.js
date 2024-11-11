import React, { useEffect } from "react"
import { connect } from 'react-redux'

import PageContentWrapper from "../components/PageContentWrapper"
import Header from "../components/Header"
import SubHeader from "../components/SubHeader"
import ParagraphText from "../components/ParagraphText"
import ButtonLink from "../components/ButtonLink"
import { wixData as wixDataState } from "../state"

import "./Homepage.styl"

const { fetchHomepageData } = wixDataState

function homepage({
    homepageData,
    homepageDataLoading,
    homepageDataError,
    onFetchHomepageData,
	navbarData,
    navbarDataLoading,
    navbarDataError
}) {
    const { bannerImage, description, mainBannerText, subtitle } = homepageData

    useEffect(() => {
        if (!Object.keys(homepageData).length) {
            onFetchHomepageData()
        }
    }, [])

	return (
		<PageContentWrapper loading={homepageDataLoading || navbarDataLoading} centerChildren={true}>
			<div className="homepage">
    		    <div className="image">
					<img src={bannerImage}/>
				</div>
				<div className="text">
					<Header text={mainBannerText}/>
					<SubHeader text={subtitle}/>
					<ParagraphText text={description}/>
					<div className="links">
						{navbarData.filter(d => d.route !== "/").map(d => <ButtonLink key={d.route} route={d.route} text={d.title}/>)}
					</div>
				</div>
    		</div>
		</PageContentWrapper>
	)
}

const mapState = state => {
    return {
        homepageData: state.wixData.homepageData,
        homepageDataLoading: state.wixData.homepageDataLoading,
        homepageDataError: state.wixData.homepageDataError,
		navbarData: state.wixData.navbarData,
        navbarDataLoading: state.wixData.navbarDataLoading,
        navbarDataError: state.wixData.navbarDataError
    }
}

const mapDispatch = dispatch => ({
    onFetchHomepageData: () => dispatch(fetchHomepageData())
})

export default connect(mapState, mapDispatch)(homepage);