import React from 'react'

import './ParagraphText.styl'

export default function ParagraphText({ html }) {
  return (
    <div
      className="paragraph-text"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
