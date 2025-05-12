import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { asHTML } from '../../services/prismic'
import { getBlogPosts } from '../../services/blogger'
import fecha from 'fecha'

import PageContentWrapper from '../../components/PageContentWrapper'
import Header from '../../components/Header'
import ButtonLink from '../../components/ButtonLink'
import Button from '../../components/Button'
import Loader from '../../components/Loader'

import './ViaMusicae.styl'
import ParagraphText from '../../components/ParagraphText'
import { fetchMusicBlogRootData } from '../../state/externalData'

function ViaMusicae({ 
  navbarData, 
  navbarDataLoading,
  musicBlogRootData,
  musicBlogRootDataLoading,
  musicBlogRootDataError,
  onFetchMusicBlogRootData,
 }) {
  const main_header_html = asHTML(musicBlogRootData && musicBlogRootData.main_header)
  const description_html = asHTML(musicBlogRootData && musicBlogRootData.description)

  const [nextPageToken, setNextPageToken] = useState('')
  const [loadingPosts, setLoadingPosts] = useState(false)
  const [posts, setPosts] = useState([])

  const { pathname } = useLocation()
  const musicLink = navbarData.find((d) =>
    d.route.startsWith('/' + pathname.split('/')[1])
  )
  const loading = navbarDataLoading || musicBlogRootDataLoading

  async function getPosts() {
    setLoadingPosts(true)

    const { items, nextPageToken: newToken } = await getBlogPosts(nextPageToken)
    setNextPageToken(newToken)

    if (items.length) {
      const newPosts = posts.concat(items)
      setPosts(newPosts)
    }

    setLoadingPosts(false)
  }

  useEffect(() => {
    onFetchMusicBlogRootData()
    getPosts()
  }, [])

  return (
    <PageContentWrapper loading={loading}>
      <div className="via-musicae">
        <Header html={main_header_html} errMsg={musicBlogRootDataError}/>
        <ParagraphText html={description_html} />

        {posts.map((p, index) => (
          <OnePost key={index} {...p} />
        ))}

        {!loadingPosts && (
          <div className="load-more">
            {nextPageToken ? (
              <Button text="Load more" onClick={getPosts} />
            ) : (
              <i>All posts loaded.</i>
            )}
          </div>
        )}

        {loadingPosts && <Loader />}

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
    musicBlogRootData: state.externalData.musicBlogRootData,
    musicBlogRootDataLoading: state.externalData.musicBlogRootDataLoading,
    musicBlogRootDataError: state.externalData.musicBlogRootDataError,
  }
}

const mapDispatch = (dispatch) => ({
    onFetchMusicBlogRootData: () => dispatch(fetchMusicBlogRootData()),
})

export default connect(mapState, mapDispatch)(ViaMusicae)

function OnePost({ title, url, content: content_html, published }) {
  const date = fecha.format(new Date(published), 'D MMMM YYYY')

  return (
    <div className="one-post">
      <h2>{title}</h2>
      <ParagraphText html={content_html} />
      <p className="date-stamp">
        <i>
          {date}
          <br />
          View original post{' '}
          <a href={url} className="post-link" target="__blank">
            here
          </a>
        </i>
      </p>
      <hr />
    </div>
  )
}
