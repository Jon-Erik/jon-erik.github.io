import React, { useEffect } from 'react'
import Loader from './Loader'

import './PageContentWrapper.styl'

export default function PageContentWrapper({
  loading,
  children,
  centerChildren
}) {
  useEffect(() => {
    document.querySelector('.page-content').scrollTo(0, 0)
  }, [])

  return (
    <div className={`page-content-wrapper ${loading ? 'loading' : ''}`}>
      {loading ? (
        <Loader />
      ) : (
        <div
          className={`children ${centerChildren ? 'vertical-center-content' : ''}`}
        >
          {children}
        </div>
      )}
    </div>
  )
}
