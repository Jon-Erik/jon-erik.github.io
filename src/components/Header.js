import React from 'react'

import './Header.styl'

export default function Header({ html }) {
  return <div className="header" dangerouslySetInnerHTML={{ __html: html }} />
}
