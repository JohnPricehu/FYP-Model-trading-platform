import React from 'react'
import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const Paginate = ({ page, pages, isAdmin, isMember , keyword = '' }) => {
  return (
    pages > 1 && (
      <Pagination>
        {[...Array(pages).keys()].map((x) => (
          <LinkContainer
            key={x + 1}
            to={
              !isAdmin ? (
                !isMember ? (
                  keyword ? (
                  `/search/${keyword}/page/${x + 1}`)
                  : (`/page/${x + 1}`)                   
                ) : (
                  keyword ? (
                    `member/search/${keyword}/page/${x + 1}`)
                    : (`member/page/${x + 1}`)  )
              )  : (`/admin/goodslist/${x + 1}`)
            }
          >
            <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
          </LinkContainer>
        ))}
      </Pagination>
    )
  )
}

export default Paginate
