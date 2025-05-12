import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { asHTML } from '../services/prismic'
import { fetchHomepageData } from '../state/externalData'

import PageContentWrapper from '../components/PageContentWrapper'
import Header from '../components/Header'
import SubHeader from '../components/SubHeader'
import ParagraphText from '../components/ParagraphText'
import ButtonLink from '../components/ButtonLink'

import './Homepage.styl'

function Homepage({ 
  navbarData, 
  navbarDataLoading, 
  homepageData,
  homepageDataLoading,
  homepageDataError,
  onFetchHomepageData
}) {
  const portrait = homepageData && homepageData.portrait && homepageData.portrait.url
  const main_header_html = asHTML(homepageData && homepageData.main_header)
  const subheader_html = asHTML(homepageData && homepageData.subheader)
  const text_content_html = asHTML(homepageData && homepageData.text_content)

  const loading = navbarDataLoading || homepageDataLoading 

  useEffect(() => {
    onFetchHomepageData()
  }, [])

  return (
    <PageContentWrapper loading={loading} centerChildren={true}>
      <div className="homepage">
        <div className="image">
          <img src={portrait} />
        </div>
        <div className="text">
          <Header html={main_header_html} errMsg={homepageDataError} />
          <SubHeader html={subheader_html} />
          <ParagraphText html={text_content_html} />
          <div className="links">
            {navbarData
              .filter((d) => d.route !== '/')
              .map((d) => (
                <ButtonLink key={d.route} route={d.route} text={d.title} />
              ))}
          </div>
        </div>
      </div>
    </PageContentWrapper>
  )
}

const mapState = (state) => {
  return {
    navbarData: state.externalData.navbarData,
    navbarDataLoading: state.externalData.navbarDataLoading,
    homepageData: state.externalData.homepageData,
    homepageDataLoading: state.externalData.homepageDataLoading,
    homepageDataError: state.externalData.homepageDataError,
  }
}

const mapDispatch = (dispatch) => ({
  onFetchHomepageData: () => dispatch(fetchHomepageData())
})

export default connect(mapState, mapDispatch)(Homepage)
