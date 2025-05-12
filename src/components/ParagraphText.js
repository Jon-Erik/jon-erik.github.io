import React from 'react'
// import {
//   PrismicRichText as BasePrismicRichText,
//   PrismicRichTextProps,
//   JSXMapSerializer,
// } from "@prismicio/react"

import './ParagraphText.styl'

export default function ParagraphText({ html, errMsg }) {
  if (errMsg) {
    return <div>ERROR LOADING: {errMsg}</div>
  }

  return (
    <div
      className="paragraph-text"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
