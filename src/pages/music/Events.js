import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { asHTML } from '../../services/prismic'
import fecha from 'fecha'
import {
  fetchMusicEventsRootData,
  fetchMusicEventsData
} from '../../state/externalData'

import PageContentWrapper from '../../components/PageContentWrapper'
import Header from '../../components/Header'
import ButtonLink from '../../components/ButtonLink'

import './Events.styl'
import ParagraphText from '../../components/ParagraphText'

function MusicEvents({
  navbarData,
  navbarDataLoading,
  musicEventsRootData,
  musicEventsRootDataLoading,
  musicEventsRootDataError,
  onFetchMusicEventsRootData,
  musicEventsData,
  musicEventsDataLoading,
  musicEventsDataError,
  onFetchMusicEventsData
}) {
  const main_header_html = asHTML(
    musicEventsRootData && musicEventsRootData.main_header
  )
  const description_html = asHTML(
    musicEventsRootData && musicEventsRootData.description
  )

  const { pathname } = useLocation()
  const musicLink = navbarData.find((d) =>
    d.route.startsWith('/' + pathname.split('/')[1])
  )
  const loading =
    navbarDataLoading || musicEventsRootDataLoading || musicEventsDataLoading

  const upcomingEvents = musicEventsData.filter(
    (e) => new Date(e.date_and_time) > new Date()
  )
  const pastEvents = musicEventsData.filter(
    (e) => new Date(e.date_and_time) <= new Date()
  )

  function sortByDate(a, b, asc = false) {
    const dateA = new Date(a.date_and_time)
    const dateB = new Date(b.date_and_time)

    if (asc) {
      return dateA - dateB
    } else {
      return dateB - dateA
    }
  }

  useEffect(() => {
    onFetchMusicEventsRootData()
    onFetchMusicEventsData()
  }, [])

  return (
    <PageContentWrapper loading={loading}>
      <div className="music-events">
        <Header html={main_header_html} errMsg={musicEventsRootDataError} />
        <ParagraphText html={description_html} errMsg={musicEventsDataError} />

        <h2>Upcoming Events</h2>
        {upcomingEvents && upcomingEvents.length == 0 && (
          <p>
            <i>No upcoming events.</i>
          </p>
        )}
        {upcomingEvents &&
          upcomingEvents
            .sort(sortByDate)
            .map((e, index) => <OneEvent key={index} {...e} />)}

        <h2>Past Events</h2>
        {pastEvents &&
          pastEvents
            .sort(sortByDate)
            .map((e, index) => <OneEvent key={index} {...e} />)}

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
    musicEventsRootData: state.externalData.musicEventsRootData,
    musicEventsRootDataLoading: state.externalData.musicEventsRootDataLoading,
    musicEventsRootDataError: state.externalData.musicEventsRootDataError,
    musicEventsData: state.externalData.musicEventsData,
    musicEventsDataLoading: state.externalData.musicEventsDataLoading,
    musicEventsDataError: state.externalData.musicEventsDataError
  }
}

const mapDispatch = (dispatch) => ({
  onFetchMusicEventsRootData: () => dispatch(fetchMusicEventsRootData()),
  onFetchMusicEventsData: () => dispatch(fetchMusicEventsData())
})

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
