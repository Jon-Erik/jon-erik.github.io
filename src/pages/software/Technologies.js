import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { asHTML } from '../../services/prismic'
import { fetchSoftwareTechData } from '../../state/externalData'

import PageContentWrapper from '../../components/PageContentWrapper'
import Header from '../../components/Header'
import ButtonLink from '../../components/ButtonLink'
import ParagraphText from '../../components/ParagraphText'

import './Technologies.styl'

function SoftwareTechnologies({
  navbarData,
  navbarDataLoading,
  softwareTechData,
  softwareTechDataLoading,
  softwareTechDataError,
  onFetchSoftwareTechData
}) {
  const main_header_html = asHTML(softwareTechData && softwareTechData.main_header)
  const description_html = asHTML(softwareTechData && softwareTechData.description)
  const main_content_html = asHTML(softwareTechData && softwareTechData.main_content)

  const { pathname } = useLocation()
  const softwareLink = navbarData.find((d) =>
    d.route.startsWith('/' + pathname.split('/')[1])
  )
  const loading = navbarDataLoading || softwareTechDataLoading

  useEffect(() => {
    onFetchSoftwareTechData()
  }, [])

  return (
    <PageContentWrapper loading={loading}>
      <div className="software-resume">
        <Header html={main_header_html} />
        <ParagraphText html={description_html} />
        <div
          className="imported-html"
          dangerouslySetInnerHTML={{ __html: main_content_html }}
        />
        <div className="links">
          {softwareLink &&
            softwareLink.children
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
    softwareTechData: state.externalData.softwareTechData,
    softwareTechDataLoading: state.externalData.softwareTechDataLoading,
    softwareTechDataError: state.externalData.softwareTechDataError,
  }
}

const mapDispatch = (dispatch) => ({
  onFetchSoftwareTechData: () => dispatch(fetchSoftwareTechData())
})

export default connect(mapState, mapDispatch)(SoftwareTechnologies)
