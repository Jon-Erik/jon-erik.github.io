import React, { useEffect } from "react"
import { connect } from 'react-redux'

import { Link } from "react-router-dom"

import PageContentWrapper from "../components/PageContentWrapper"
import Header from "../components/Header"
import SubHeader from "../components/SubHeader"
import ParagraphText from "../components/ParagraphText"
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

    console.log(homepageData)

    useEffect(() => {
        if (!Object.keys(homepageData).length) {
            onFetchHomepageData()
        }
    }, [])

	return (
		<PageContentWrapper loading={homepageDataLoading} centerChildren={true}>
			<div className="homepage">
    		    <div className="image">
					<img src={bannerImage}/>
				</div>
				<div className="text">
					<Header text={mainBannerText}/>
					<SubHeader text={subtitle}/>
					<ParagraphText text={description}/>
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