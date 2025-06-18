import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { asHTML } from '../../services/prismic'
import { DateTime } from 'luxon'
import {
  fetchMusicEventsRootData,
  fetchMusicEventsFutureData,
  fetchMusicEventsPastData
} from '../../state/externalData'

import PageContentWrapper from '../../components/PageContentWrapper'
import Header from '../../components/Header'
import Pagination from '../../components/Pagination'
import ButtonLink from '../../components/ButtonLink'
import Loader from '../../components/Loader'

import './Events.styl'
import ParagraphText from '../../components/ParagraphText'

const FUTURE_PAGE_SIZE = 100
const PAST_PAGE_SIZE = 5
const DEFAULT_TZ = 'America/New_York'

function MusicEvents({
  navbarData,
  navbarDataLoading,
  musicEventsRootData,
  musicEventsRootDataLoading,
  musicEventsRootDataError,
  onFetchMusicEventsRootData,
  musicEventsFutureData,
  musicEventsFutureDataLoading,
  musicEventsFutureDataError,
  onFetchMusicEventsFutureData,
  musicEventsPastData,
  musicEventsPastDataLoading,
  musicEventsPastDataError,
  onFetchMusicEventsPastData
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
  const loading = navbarDataLoading || musicEventsRootDataLoading

  const [futurePage, setFuturePage] = useState(1)
  const futureEvents =
    musicEventsFutureData && musicEventsFutureData.results
      ? musicEventsFutureData.results.map((item) => item.data)
      : []
  // const futureTotalResults = musicEventsFutureData.total_results_size || 0
  // const futureTotalPages = musicEventsFutureData.total_pages || 0

  const [pastPage, setPastPage] = useState(1)
  const pastEvents =
    musicEventsPastData && musicEventsPastData.results
      ? musicEventsPastData.results.map((item) => item.data)
      : []
  const pastTotalResults = musicEventsPastData.total_results_size || 0

  function onPastPgChange(newPgNum) {
    setPastPage(newPgNum)
    setTimeout(() => {
      // Wait a split second for the new data to load
      document.getElementById('past-events-header').scrollIntoView(true)
    }, 100)
  }

  useEffect(() => {
    onFetchMusicEventsRootData()
  }, [])

  useEffect(() => {
    onFetchMusicEventsFutureData({
      page: futurePage,
      pageSize: FUTURE_PAGE_SIZE
    })
  }, [futurePage])

  useEffect(() => {
    onFetchMusicEventsPastData({ page: pastPage, pageSize: PAST_PAGE_SIZE })
  }, [pastPage])

  return (
    <PageContentWrapper loading={loading}>
      <div className="music-events">
        <Header html={main_header_html} errMsg={musicEventsRootDataError} />
        <ParagraphText
          html={description_html}
          errMsg={musicEventsFutureDataError || musicEventsPastDataError}
        />

        <h2>Upcoming Events</h2>
        {musicEventsFutureDataLoading ? (
          <Loader size="small" />
        ) : (
          <React.Fragment>
            {futureEvents && futureEvents.length == 0 && (
              <p>
                <i>No upcoming events.</i>
              </p>
            )}
            {futureEvents &&
              futureEvents.map((e, index) => <OneEvent key={index} {...e} />)}
          </React.Fragment>
        )}

        <h2 id="past-events-header">Past Events</h2>
        <Pagination
          currentPage={pastPage}
          totalResults={pastTotalResults}
          pageSize={PAST_PAGE_SIZE}
          onPageChange={onPastPgChange}
        />
        {musicEventsPastDataLoading ? (
          <Loader size="small" />
        ) : (
          pastEvents &&
          pastEvents.map((e, index) => <OneEvent key={index} {...e} />)
        )}
        <Pagination
          currentPage={pastPage}
          totalResults={pastTotalResults}
          pageSize={PAST_PAGE_SIZE}
          onPageChange={onPastPgChange}
          hidePageStats={true}
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
    musicEventsRootData: state.externalData.musicEventsRootData,
    musicEventsRootDataLoading: state.externalData.musicEventsRootDataLoading,
    musicEventsRootDataError: state.externalData.musicEventsRootDataError,
    musicEventsFutureData: state.externalData.musicEventsFutureData,
    musicEventsFutureDataLoading:
      state.externalData.musicEventsFutureDataLoading,
    musicEventsFutureDataError: state.externalData.musicEventsFutureDataError,
    musicEventsPastData: state.externalData.musicEventsPastData,
    musicEventsPastDataLoading: state.externalData.musicEventsPastDataLoading,
    musicEventsPastDataError: state.externalData.musicEventsPastDataError
  }
}

const mapDispatch = (dispatch) => ({
  onFetchMusicEventsRootData: () => dispatch(fetchMusicEventsRootData()),
  onFetchMusicEventsFutureData: (params) =>
    dispatch(fetchMusicEventsFutureData(params)),
  onFetchMusicEventsPastData: (params) =>
    dispatch(fetchMusicEventsPastData(params))
})

export default connect(mapState, mapDispatch)(MusicEvents)

function OneEvent({
  address,
  date_and_time,
  description,
  link,
  organization,
  title,
  time_zone
}) {
  const address_html = asHTML(address)
  const title_html = asHTML(title)
  const description_html = asHTML(description)
  const organization_html = asHTML(organization)
  const date_and_time_parsed = DateTime.fromISO(date_and_time, {
    zone: time_zone || DEFAULT_TZ
  }).toLocaleString(DateTime.DATETIME_FULL)

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
