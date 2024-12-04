import React from 'react'
import { connect } from 'react-redux'
import { useLocation } from 'react-router-dom'
import {
  useSinglePrismicDocument,
  useAllPrismicDocumentsByType
} from '@prismicio/react'
import { asHTML } from '../../services/prismic'
import fecha from 'fecha'

import PageContentWrapper from '../../components/PageContentWrapper'
import Header from '../../components/Header'
import ButtonLink from '../../components/ButtonLink'

import './Events.styl'
import ParagraphText from '../../components/ParagraphText'

function MusicEvents({ navbarData, navbarDataLoading, navbarDataError }) {
  const [musicEventsRootData, musicEventsRootLoading] =
    useSinglePrismicDocument('music_events_root')
  const main_header_html = asHTML(
    musicEventsRootData && musicEventsRootData.data.main_header
  )
  const description_html = asHTML(
    musicEventsRootData && musicEventsRootData.data.description
  )

  const [musicEventsData, musicEventsLoading] =
    useAllPrismicDocumentsByType('music_events')

  const { pathname } = useLocation()
  const musicLink = navbarData.find((d) =>
    d.route.startsWith('/' + pathname.split('/')[1])
  )
  const loading =
    navbarDataLoading ||
    !musicEventsRootLoading ||
    musicEventsRootLoading.state !== 'loaded' ||
    !musicEventsLoading ||
    musicEventsLoading.state !== 'loaded'

  const upcomingEvents =
    musicEventsData &&
    musicEventsData.filter((e) => new Date(e.data.date_and_time) > new Date())
  const pastEvents =
    musicEventsData &&
    musicEventsData.filter((e) => new Date(e.data.date_and_time) <= new Date())

  function sortByDate(a, b, asc = false) {
    const dateA = new Date(a.data.date_and_time)
    const dateB = new Date(b.data.date_and_time)

    if (asc) {
      return dateA - dateB
    } else {
      return dateB - dateA
    }
  }

  return (
    <PageContentWrapper loading={loading}>
      <div className="software-resume">
        <Header html={main_header_html} />
        <ParagraphText html={description_html} />

        <h2>Upcoming Events</h2>
        {upcomingEvents && upcomingEvents.length == 0 && (
          <p>
            <i>No upcoming events.</i>
          </p>
        )}
        {upcomingEvents &&
          upcomingEvents.sort(sortByDate).map((e) => <OneEvent {...e.data} />)}

        <h2>Past Events</h2>
        {pastEvents &&
          pastEvents.sort(sortByDate).map((e) => <OneEvent {...e.data} />)}

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

export default connect(mapState, mapDispatch)(MusicEvents)

function OneEvent({
  address,
  date_and_time,
  description,
  link,
  organization,
  title
}) {
  const address_html = asHTML(address)
  const title_html = asHTML(title)
  const description_html = asHTML(description)
  const organization_html = asHTML(organization)
  const date_and_time_parsed = fecha.format(
    new Date(date_and_time),
    'h:mm A, MMMM D, YYYY'
  )

  return (
    <div className="one-event">
      <a
        className="header-link"
        href={link.url}
        target="_blank"
        dangerouslySetInnerHTML={{ __html: title_html }}
      />
      <div
        className="organization"
        dangerouslySetInnerHTML={{ __html: organization_html }}
      />
      <div className="date-and-time">{date_and_time_parsed}</div>
      <div
        className="address"
        dangerouslySetInnerHTML={{ __html: address_html }}
      />
      <div
        className="description"
        dangerouslySetInnerHTML={{ __html: description_html }}
      />
    </div>
  )
}
