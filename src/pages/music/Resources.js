import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useLocation } from 'react-router'
import { asHTML } from '../../services/prismic'
import {
  fetchMusicResourcesRootData,
  fetchMusicResourcesData
} from '../../state/externalData'

import PageContentWrapper from '../../components/PageContentWrapper'
import Header from '../../components/Header'
import ButtonLink from '../../components/ButtonLink'

import './Resources.styl'
import ParagraphText from '../../components/ParagraphText'

function MusicResources({
  navbarData,
  navbarDataLoading,
  musicResourcesRootData,
  musicResourcesRootDataLoading,
  musicResourcesRootDataError,
  onFetchMusicResourcesRootData,
  musicResourcesData,
  musicResourcesDataLoading,
  musicResourcesDataError,
  onFetchMusicResourcesData
}) {
  const main_header_html = asHTML(
    musicResourcesRootData && musicResourcesRootData.main_header
  )
  const description_html = asHTML(
    musicResourcesRootData && musicResourcesRootData.description
  )

  const { pathname } = useLocation()
  const musicLink = navbarData.find((d) =>
    d.route.startsWith('/' + pathname.split('/')[1])
  )
  const loading =
    navbarDataLoading ||
    musicResourcesRootDataLoading ||
    musicResourcesDataLoading

  useEffect(() => {
    onFetchMusicResourcesRootData()
    onFetchMusicResourcesData()
  }, [])

  return (
    <PageContentWrapper loading={loading}>
      <div className="music-resources">
        <Header html={main_header_html} errMsg={musicResourcesRootDataError} />
        <ParagraphText
          html={description_html}
          errMsg={musicResourcesDataError}
        />

        {musicResourcesData &&
          musicResourcesData.map((r, i) => <OneResource key={i} {...r} />)}

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
    musicResourcesRootData: state.externalData.musicResourcesRootData,
    musicResourcesRootDataLoading:
      state.externalData.musicResourcesRootDataLoading,
    musicResourcesRootDataError: state.externalData.musicResourcesRootDataError,
    musicResourcesData: state.externalData.musicResourcesData,
    musicResourcesDataLoading: state.externalData.musicResourcesDataLoading,
    musicResourcesDataError: state.externalData.musicResourcesDataError
  }
}

const mapDispatch = (dispatch) => ({
  onFetchMusicResourcesRootData: () => dispatch(fetchMusicResourcesRootData()),
  onFetchMusicResourcesData: () => dispatch(fetchMusicResourcesData())
})

export default connect(mapState, mapDispatch)(MusicResources)

function OneResource({ main_content, media_attachment, title }) {
  const main_content_html = asHTML(main_content)
  const title_html = asHTML(title)
  const { name: linkName, url: linkURL } = media_attachment

  return (
    <div className="one-resource">
      <Header html={title_html} />
      <ParagraphText html={main_content_html} />
      <div className="resource-link">
        <a href={linkURL} target="__blank">
          {linkName}
        </a>
      </div>
    </div>
  )
}
