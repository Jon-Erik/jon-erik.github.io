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

function Homepage({
	navbarData,
    navbarDataLoading,
    navbarDataError
}) {
    const [ homepageData, homepageLoading ] = useSinglePrismicDocument('homepage')
    const portrait = homepageData && homepageData.data.portrait.url
    const main_header = homepageData && homepageData.data.main_header[0].text
    const subheader = homepageData && homepageData.data.subheader[0].text
    const text_content = homepageData && homepageData.data.text_content[0].text

    const loading = navbarDataLoading || !homepageLoading || homepageLoading.state !== "loaded"

	return (
		<PageContentWrapper loading={loading} centerChildren={true}>
			<div className="homepage">
    		    <div className="image">
					<img src={portrait}/>
				</div>
				<div className="text">
					<Header text={main_header}/>
					<SubHeader text={subheader}/>
					<ParagraphText text={text_content}/>
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
		navbarData: state.externalData.navbarData,
        navbarDataLoading: state.externalData.navbarDataLoading,
        navbarDataError: state.externalData.navbarDataError
    }
}

const mapDispatch = dispatch => ({
    onFetchHomepageData: () => dispatch(fetchHomepageData())
})

export default connect(mapState, mapDispatch)(Homepage);