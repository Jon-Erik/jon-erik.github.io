import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { useSinglePrismicDocument } from '@prismicio/react'
import { asHTML } from '../../services/prismic'

import PageContentWrapper from '../../components/PageContentWrapper'
import Header from '../../components/Header'
import SubHeader from '../../components/SubHeader'
import ButtonLink from '../../components/ButtonLink'
import ParagraphText from '../../components/ParagraphText'
import { externalData as externalDataState } from '../../state'

import './Technologies.styl'

function SoftwareTechnologies({
  navbarData,
  navbarDataLoading,
  navbarDataError
}) {
  const [softwareTechnologiesData, softwareTechnologiesLoading] =
    useSinglePrismicDocument('software_technologies')
  const main_header_html = asHTML(
    softwareTechnologiesData && softwareTechnologiesData.data.main_header
  )
  const description_html = asHTML(
    softwareTechnologiesData && softwareTechnologiesData.data.description
  )
  const main_content_html = asHTML(
    softwareTechnologiesData && softwareTechnologiesData.data.main_content
  )

  const { pathname } = useLocation()
  const softwareLink = navbarData.find((d) =>
    d.route.startsWith('/' + pathname.split('/')[1])
  )
  const loading =
    navbarDataLoading ||
    !softwareTechnologiesLoading ||
    softwareTechnologiesLoading.state !== 'loaded'

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
    navbarDataError: state.externalData.navbarDataError
  }
}

const mapDispatch = (dispatch) => ({})

export default connect(mapState, mapDispatch)(SoftwareTechnologies)
