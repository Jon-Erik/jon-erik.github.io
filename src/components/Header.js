import React from 'react'

import './Header.styl'

export default function Header({ html, errMsg }) {
  if (errMsg) {
    return <div>ERROR LOADING: {errMsg}</div>
  }
  return <div className="header" dangerouslySetInnerHTML={{ __html: html }} />
}
