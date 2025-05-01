import React from 'react'
import { Link } from 'react-router-dom'

import './Button.styl'

export default function Button({ onClick, text, isNavLink=true, className, disabled=false }) {
  if (isNavLink) {
    return (
      <Link className={`button ${className}`} onClick={onClick} disabled={disabled}>
        {text}
      </Link>
    )
  } else {
    return (
      <button className={`button ${className} loading`} onClick={onClick} disabled={disabled}>
        {text}
      </button>
    )
  }
}
