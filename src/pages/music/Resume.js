import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { useSinglePrismicDocument } from '@prismicio/react'
import { asHTML } from '../../services/prismic'

import PageContentWrapper from '../../components/PageContentWrapper'
import Header from '../../components/Header'
import SubHeader from '../../components/SubHeader'
import ButtonLink from '../../components/ButtonLink'

import './Resume.styl'

function MusicResume({ navbarData, navbarDataLoading, navbarDataError }) {
  const [musicResumeData, musicResumeLoading] =
    useSinglePrismicDocument('music_resume')
  const main_header_html = asHTML(
    musicResumeData && musicResumeData.data.main_header
  )
  const education_html = asHTML(
    musicResumeData && musicResumeData.data.education
  )
  const performance_experience_html = asHTML(
    musicResumeData && musicResumeData.data.performance_experience
  )

  const { pathname } = useLocation()
  const musicLink = navbarData.find((d) =>
    d.route.startsWith('/' + pathname.split('/')[1])
  )
  const loading =
    navbarDataLoading ||
    !musicResumeLoading ||
    musicResumeLoading.state !== 'loaded'

  return (
    <PageContentWrapper loading={loading}>
      <div className="software-resume">
        <Header html={main_header_html} />
        <div
          className="imported-html"
          dangerouslySetInnerHTML={{ __html: performance_experience_html }}
        />
        <div
          className="imported-html"
          dangerouslySetInnerHTML={{ __html: education_html }}
        />
        <div className="links">
          {musicLink &&
            musicLink.children
              .filter((d) => d.route !== pathname)
              .map((d) => (
                <ButtonLink
                  key={d.route}
                  route={d.route}
                  text={`View ${d.title}`}
                />
              ))}
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

export default connect(mapState, mapDispatch)(MusicResume)
