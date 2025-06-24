import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useLocation } from 'react-router'
import { asHTML } from '../services/prismic'
import { fetchSoftwareData } from '../state/externalData'

import PageContentWrapper from '../components/PageContentWrapper'
import Header from '../components/Header'
import ParagraphText from '../components/ParagraphText'
import ButtonLink from '../components/ButtonLink'

import './Software.styl'

function Software({
  navbarData,
  navbarDataLoading,
  softwareData,
  softwareDataLoading,
  softwareDataError,
  onFetchSoftwareData
}) {
  const main_header_html = asHTML(softwareData && softwareData.main_header)
  const description_html = asHTML(softwareData && softwareData.description)

  const { pathname } = useLocation()
  const softwareLink = navbarData.find((d) => d.route.startsWith(pathname))
  const loading = navbarDataLoading || softwareDataLoading

  useEffect(() => {
    onFetchSoftwareData()
  }, [])

  return (
    <PageContentWrapper loading={loading} centerChildren={true}>
      <div className="software">
        <Header html={main_header_html} errMsg={softwareDataError} />
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
    softwareData: state.externalData.softwareData,
    softwareDataLoading: state.externalData.softwareDataLoading,
    softwareDataError: state.externalData.softwareDataError
  }
}

const mapDispatch = (dispatch) => ({
  onFetchSoftwareData: () => dispatch(fetchSoftwareData())
})

export default connect(mapState, mapDispatch)(Software)
