import React from 'react'
import PageContentWrapper from '../components/PageContentWrapper'
import ButtonLink from '../components/ButtonLink'

import './NotFound.styl'

function NotFound() {
  return (
    <PageContentWrapper>
      <div className="not-found">
        <p>The requested page could not be found.</p>
        <ButtonLink route="/" text="Return to Homepage" />
      </div>
    </PageContentWrapper>
  )
}

export default NotFound
