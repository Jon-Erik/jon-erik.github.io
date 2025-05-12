import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { asHTML } from '../../services/prismic'
import { fetchSoftwareResumeData } from '../../state/externalData'

import PageContentWrapper from '../../components/PageContentWrapper'
import Header from '../../components/Header'
import ParagraphText from '../../components/ParagraphText'
import ButtonLink from '../../components/ButtonLink'

import './Resume.styl'

function SoftwareResume({
  navbarData, 
  navbarDataLoading,
  softwareResumeData,
  softwareResumeDataLoading,
  softwareResumeDataError,
  onFetchSoftwareResumeData,
}) {
  const main_header_html = asHTML(softwareResumeData && softwareResumeData.main_header)
  const education_html = asHTML(softwareResumeData && softwareResumeData.education)
  const work_experience_html = asHTML(softwareResumeData && softwareResumeData.work_experience)

  const { pathname } = useLocation()
  const softwareLink = navbarData.find((d) =>
    d.route.startsWith('/' + pathname.split('/')[1])
  )
  const loading = navbarDataLoading || softwareResumeDataLoading

  useEffect(() => {
    onFetchSoftwareResumeData()
  }, [])

  return (
    <PageContentWrapper loading={loading}>
      <div className="software-resume imported-html">
        <Header text={main_header_html} errMsg={softwareResumeDataError} />
        <ParagraphText html={work_experience_html} />
        <ParagraphText html={education_html} />
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
    softwareResumeData: state.externalData.softwareResumeData,
    softwareResumeDataLoading: state.externalData.softwareResumeDataLoading,
    softwareResumeDataError: state.externalData.softwareResumeDataError,
  }
}

const mapDispatch = (dispatch) => ({
  onFetchSoftwareResumeData: () => dispatch(fetchSoftwareResumeData()),
})

export default connect(mapState, mapDispatch)(SoftwareResume)
