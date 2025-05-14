import React from 'react'

import './SubHeader.styl'

export default function SubHeader({ html, errMsg, className }) {
  if (errMsg) {
    return <div>ERROR LOADING: {errMsg}</div>
  }
  return (
    <div
      className={`sub-header ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
