import React, { useEffect } from "react"
import { connect } from 'react-redux'

import PageContentWrapper from "../components/PageContentWrapper"
import Header from "../components/Header"
import SubHeader from "../components/SubHeader"
import ParagraphText from "../components/ParagraphText"
import ButtonLink from "../components/ButtonLink"
import { externalData as externalDataState } from "../state"

import { useSinglePrismicDocument } from '@prismicio/react'

import "./Homepage.styl"

const { fetchHomepageData } = externalDataState

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
    //const response = useSinglePrismicDocument('homepage')
   // console.log(response)

    useEffect(() => {
        if (!Object.keys(homepageData).length) {
            //onFetchHomepageData()
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
        homepageData: state.externalData.homepageData,
        homepageDataLoading: state.externalData.homepageDataLoading,
        homepageDataError: state.externalData.homepageDataError,
		navbarData: state.externalData.navbarData,
        navbarDataLoading: state.externalData.navbarDataLoading,
        navbarDataError: state.externalData.navbarDataError
    }
}

const mapDispatch = dispatch => ({
    onFetchHomepageData: () => dispatch(fetchHomepageData())
})

export default connect(mapState, mapDispatch)(homepage);