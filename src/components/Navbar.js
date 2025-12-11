import React, { useEffect, useState, useRef } from 'react'
import { connect } from 'react-redux'
import { Link, useLocation } from 'react-router'
import { AiOutlineClose } from 'react-icons/ai'
import { RiMenuFill, RiMenuFold2Line } from 'react-icons/ri'

import './Navbar.styl'

import { elementOrParentsHaveClass } from '../services/utils'
import { externalData as externalDataState } from '../state'
import Loader from './Loader'

const { fetchNavbarData } = externalDataState

export function Navbar({
  onFetchNavbarData,
  navbarData,
  navbarDataLoading,
  navbarDataError
}) {
  const location = useLocation()
  const [menuExpanded, setMenuExpanded] = useState(false)
  const menuExpandedRef = useRef(menuExpanded)

  function toggleMenu(value) {
    const newValue = value !== undefined ? value : !menuExpanded
    setMenuExpanded(newValue)
    menuExpandedRef.current = newValue
  }

  useEffect(() => {
    if (!navbarData.length) {
      onFetchNavbarData()
    }

    function onClickHandler(e) {
      const clickedExpandedMobileMenu = elementOrParentsHaveClass(
        'links-list-mobile',
        e.target
      )
      const clickedToggler = elementOrParentsHaveClass('menu-toggler', e.target)
      if (
        !clickedExpandedMobileMenu &&
        !clickedToggler &&
        menuExpandedRef.current
      ) {
        toggleMenu(false)
      }
    }

    document.addEventListener('click', onClickHandler)

    return () => {
      document.removeEventListener('click', onClickHandler)
    }
  }, [])

  if (navbarDataLoading) {
    return (
      <div className="navbar">
        <Loader size="small" color="white" />
      </div>
    )
  }

  if (navbarDataError) {
    return <div>ERROR LOADING: {navbarDataError}</div>
  }

  return (
    <div className="navbar">
      <div className="links-list">
        {navbarData.map((d) => (
          <NavBarLink
            key={d.route}
            linkData={d}
            currentRoute={location.pathname}
            toggleMenu={toggleMenu}
          />
        ))}
      </div>
      <div className={`links-list-mobile ${menuExpanded ? 'expanded' : ''}`}>
        <div className="mobile-content-wrapper">
          <div>
            {navbarData
              .filter((d) => d.route != '/')
              .map((d) => (
                <NavBarLink
                  key={d.route}
                  linkData={d}
                  currentRoute={location.pathname}
                  toggleMenu={toggleMenu}
                />
              ))}
          </div>
          <button
            type="button"
            className="menu-toggler"
            title="Close menu"
            onClick={() => toggleMenu()}
          >
            <AiOutlineClose />
          </button>
        </div>
      </div>
      <button
        type="button"
        className="menu-toggler"
        title={menuExpanded ? 'Close menu' : 'Expand menu'}
        onClick={() => toggleMenu()}
      >
        {menuExpanded ? (
          <RiMenuFold2Line className="menu-toggler" />
        ) : (
          <RiMenuFill className="menu-toggler" />
        )}
      </button>
    </div>
  )
}

const mapState = (state) => {
  return {
    navbarData: state.externalData.navbarData,
    navbarDataLoading: state.externalData.navbarDataLoading,
    navbarDataError: state.externalData.navbarDataError
  }
}

const mapDispatch = (dispatch) => ({
  onFetchNavbarData: () => dispatch(fetchNavbarData())
})

export default connect(mapState, mapDispatch)(Navbar)

function NavBarLink({ linkData, currentRoute, toggleMenu }) {
  const { title, route, children } = linkData
  const active = '/' + currentRoute.split('/')[1] == route

  return (
    <div className={`link ${active ? 'active' : ''}`}>
      {route.startsWith('http') ? (
        <a href={route} target="_blank" rel="noreferrer">
          {title}
        </a>
      ) : (
        <Link onClick={() => toggleMenu(false)} to={route}>
          {title}
        </Link>
      )}

      {children.length ? (
        <div className="subnav">
          {children.map((c) => (
            <NavBarSubLink
              key={c.route}
              linkData={c}
              currentRoute={currentRoute}
              toggleMenu={toggleMenu}
            />
          ))}
        </div>
      ) : null}
    </div>
  )
}

function NavBarSubLink({ linkData, currentRoute, toggleMenu }) {
  const { title, route } = linkData
  const active = currentRoute == route

  return (
    <div className={`link subnav-link ${active ? 'active' : ''}`}>
      <Link onClick={() => toggleMenu(false)} to={route}>
        {title}
      </Link>
    </div>
  )
}
