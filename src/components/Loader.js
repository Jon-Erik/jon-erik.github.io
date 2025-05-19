import React from 'react'

import './Loader.styl'

export default function Loader({ size = 'large', color = 'black' }) {
  return (
    <div className={`loader-wrapper ${size} ${color}`}>
      <div className="loader" />
    </div>
  )
}
