import React from 'react'
import { Link } from 'react-router-dom'

import './ButtonLink.styl'

export default function ButtonLink({ route, text }) {
  if (route == '/') {
    text = 'Home'
  }
  return (
    <Link className="button-link" to={route}>
      {text}
    </Link>
  )
}
