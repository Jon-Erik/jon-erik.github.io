import React from 'react'

import './SubHeader.styl'

export default function SubHeader({ html, errMsg }) {
  if (errMsg) {
    return <div>ERROR LOADING: {errMsg}</div>
  }
  return (
    <div className="sub-header" dangerouslySetInnerHTML={{ __html: html }} />
  )
}
