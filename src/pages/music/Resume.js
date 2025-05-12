import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { asHTML } from '../../services/prismic'

import PageContentWrapper from '../../components/PageContentWrapper'
import Header from '../../components/Header'
import ParagraphText from '../../components/ParagraphText'
import ButtonLink from '../../components/ButtonLink'
import { fetchMusicResumeData } from '../../state/externalData'

import './Resume.styl'

function MusicResume({ 
  navbarData, 
  navbarDataLoading,
  musicResumeData,
  musicResumeDataLoading,
  musicResumeDataError,
  onFetchMusicResumeData,
}) {
  const main_header_html = asHTML(musicResumeData && musicResumeData.main_header)
  const education_html = asHTML(musicResumeData && musicResumeData.education)
  const performance_experience_html = asHTML(musicResumeData && musicResumeData.performance_experience)

  const { pathname } = useLocation()
  const musicLink = navbarData.find((d) =>
    d.route.startsWith('/' + pathname.split('/')[1])
  )
  const loading = navbarDataLoading || musicResumeDataLoading

  useEffect(() => {
    onFetchMusicResumeData()
  }, [])

  return (
    <PageContentWrapper loading={loading}>
      <div className="software-resume imported-html">
        <Header html={main_header_html} errMsg={musicResumeDataError} />
        <ParagraphText html={performance_experience_html}/>
        <ParagraphText html={education_html}/>
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
    musicResumeData: state.externalData.musicResumeData,
    musicResumeDataLoading: state.externalData.musicResumeDataLoading,
    musicResumeDataError: state.externalData.musicResumeDataError,
  }
}

const mapDispatch = (dispatch) => ({
  onFetchMusicResumeData: () => dispatch(fetchMusicResumeData())
})

export default connect(mapState, mapDispatch)(MusicResume)
