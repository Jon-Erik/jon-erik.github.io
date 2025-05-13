import React from 'react'
import { Link } from 'react-router-dom'

import './Button.styl'

export default function Button({
  onClick,
  text,
  isNavLink = true,
  className,
  disabled = false,
  disclaimerHTML,
  loading = false
}) {
  const classNames = `button ${className || ''} ${loading ? 'loading' : ''}`
  if (isNavLink) {
    return (
      <React.Fragment>
        <Link className={classNames} onClick={onClick} disabled={disabled}>
          {text}
        </Link>
        {disclaimerHTML && (
          <div
            dangerouslySetInnerHTML={{ __html: disclaimerHTML }}
            className="btn-disclaimer"
          />
        )}
      </React.Fragment>
    )
  } else {
    return (
      <React.Fragment>
        <button className={classNames} onClick={onClick} disabled={disabled}>
          {text}
        </button>
        {disclaimerHTML && (
          <div
            dangerouslySetInnerHTML={{ __html: disclaimerHTML }}
            className="btn-disclaimer"
          />
        )}
      </React.Fragment>
    )
  }
}
