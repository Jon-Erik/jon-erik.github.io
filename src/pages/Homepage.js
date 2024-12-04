import React from 'react'
import { connect } from 'react-redux'
import { useSinglePrismicDocument } from '@prismicio/react'
import { asHTML } from '../services/prismic'

import PageContentWrapper from '../components/PageContentWrapper'
import Header from '../components/Header'
import SubHeader from '../components/SubHeader'
import ParagraphText from '../components/ParagraphText'
import ButtonLink from '../components/ButtonLink'

import './Homepage.styl'

function Homepage({ navbarData, navbarDataLoading, navbarDataError }) {
  const [homepageData, homepageLoading] = useSinglePrismicDocument('homepage')
  const portrait = homepageData && homepageData.data.portrait.url
  const main_header_html = asHTML(homepageData && homepageData.data.main_header)
  const subheader_html = asHTML(homepageData && homepageData.data.subheader)
  const text_content_html = asHTML(
    homepageData && homepageData.data.text_content
  )

  const loading =
    navbarDataLoading || !homepageLoading || homepageLoading.state !== 'loaded'

  return (
    <PageContentWrapper loading={loading} centerChildren={true}>
      <div className="homepage">
        <div className="image">
          <img src={portrait} />
        </div>
        <div className="text">
          <Header html={main_header_html} />
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
    navbarDataError: state.externalData.navbarDataError
  }
}

const mapDispatch = (dispatch) => ({})

export default connect(mapState, mapDispatch)(Homepage)
