import React from 'react'
// import {
//   PrismicRichText as BasePrismicRichText,
//   PrismicRichTextProps,
//   JSXMapSerializer,
// } from "@prismicio/react"

import './ParagraphText.styl'

export default function ParagraphText({ html, errMsg, className }) {
  if (errMsg) {
    return <div>ERROR LOADING: {errMsg}</div>
  }

  return (
    <div
      className={`paragraph-text ${className || ''}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
