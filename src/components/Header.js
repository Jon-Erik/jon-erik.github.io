import React from 'react'

import './Header.styl'

export default function Header({ html, errMsg, className }) {
  if (errMsg) {
    return <div>ERROR LOADING: {errMsg}</div>
  }
  return (
    <div
      className={`header ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
