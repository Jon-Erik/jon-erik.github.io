import React from 'react'

import {
  LuChevronFirst,
  LuChevronLast,
  LuChevronLeft,
  LuChevronRight
} from 'react-icons/lu'

import './Pagination.styl'

export default function Pagination({
  currentPage = 1,
  totalResults = 0,
  onPageChange,
  pageSize = 5,
  maxPageSelectors = 5,
  hidePageStats = false
}) {
  const totalPages = Math.ceil(totalResults / pageSize)
  const firstOnPage = pageSize * currentPage - pageSize + 1
  const lastOnPage = Math.min(pageSize * currentPage, totalResults)

  let pageSelectorsLeft = maxPageSelectors > 0 ? maxPageSelectors : 1
  const selectorsArr = []

  selectorsArr.push(currentPage)
  pageSelectorsLeft--

  while (pageSelectorsLeft > 0) {
    if (selectorsArr[selectorsArr.length - 1] != totalPages) {
      selectorsArr.push(selectorsArr[selectorsArr.length - 1] + 1)
      pageSelectorsLeft--
    }

    if (pageSelectorsLeft > 0 && selectorsArr[0] != 1) {
      selectorsArr.unshift(selectorsArr[0] - 1)
      pageSelectorsLeft--
    }

    if (selectorsArr.length == totalPages) {
      pageSelectorsLeft = 0
    }
  }

  return (
    <div className="Pagination">
      <div className="controls">
        <div
          className="selector"
          onClick={() => onPageChange(1)}
          title="First Page"
        >
          <LuChevronFirst />
        </div>
        <div
          className="selector"
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          title="Previous Page"
        >
          <LuChevronLeft />
        </div>
        {selectorsArr[0] != 1 && <div className="page-num">...</div>}
        {selectorsArr.map((pageNum) => {
          const active = pageNum == currentPage
          return (
            <div
              className={`selector page-num ${active ? 'active' : ''}`}
              onClick={() => onPageChange(pageNum)}
              key={pageNum}
            >
              {pageNum}
            </div>
          )
        })}
        {selectorsArr[selectorsArr.length - 1] != totalPages && (
          <div className="page-num">...</div>
        )}
        <div
          className="selector"
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          title="Next Page"
        >
          <LuChevronRight />
        </div>
        <div
          className="selector"
          onClick={() => onPageChange(totalPages)}
          title="Last Page"
        >
          <LuChevronLast />
        </div>
      </div>
      {!hidePageStats && (
        <div className="page-stats">
          Page {currentPage} of {totalPages} ({firstOnPage} - {lastOnPage} of{' '}
          {totalResults})
        </div>
      )}
    </div>
  )
}
