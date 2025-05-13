import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { asHTML } from '../services/prismic'
import { fetchMusicData } from '../state/externalData'

import PageContentWrapper from '../components/PageContentWrapper'
import Header from '../components/Header'
import ParagraphText from '../components/ParagraphText'
import ButtonLink from '../components/ButtonLink'

import './Software.styl'

function Software({
  navbarData,
  navbarDataLoading,
  musicData,
  musicDataLoading,
  musicDataError,
  onFetchMusicData
}) {
  const main_header_html = asHTML(musicData && musicData.main_header)
  const description_html = asHTML(musicData && musicData.description)

  const { pathname } = useLocation()
  const softwareLink = navbarData.find((d) => d.route.startsWith(pathname))
  const loading = navbarDataLoading || musicDataLoading

  useEffect(() => {
    onFetchMusicData()
  }, [])

  return (
    <PageContentWrapper loading={loading} centerChildren={true}>
      <div className="software">
        <Header html={main_header_html} errMsg={musicDataError} />
        <ParagraphText html={description_html} />
        <div className="links">
          {softwareLink &&
            softwareLink.children.map((d) => (
              <ButtonLink key={d.route} route={d.route} text={d.title} />
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
    navbarDataError: state.externalData.navbarDataError,
    musicData: state.externalData.musicData,
    musicDataLoading: state.externalData.musicDataLoading,
    musicDataError: state.externalData.musicDataError
  }
}

const mapDispatch = (dispatch) => ({
  onFetchMusicData: () => dispatch(fetchMusicData())
})

export default connect(mapState, mapDispatch)(Software)
