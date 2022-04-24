/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Button, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import ErrorMessage from '../components/ErrorMessage'
import Loading from '../components/Loading'
import { listMyHistory } from '../actions/historyActions'

const HistoryScreen = ({ history }) => {
  const dispatch = useDispatch()

  const  myHistory = useSelector((state) => state.myHistory)
  const { loading: loadinghistory, error: errorhistory, mhistorys } =  myHistory

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin



  useEffect(() => {
        dispatch(listMyHistory())
  }, [dispatch, history, userInfo])



  return (
    <>
      <h1 className='mt-5'>History</h1>
          {loadinghistory ? (
          <Loading />
        ) : errorhistory ? (
          <ErrorMessage variant='danger'>{errorhistory}</ErrorMessage>
        ) : (
          <Table striped bordered hover responsive className='tabel-sm'>
            <thead>
              <tr>
                <th>Photo</th>
                <th>Name</th>
                {/* <th>Create Date</th>
                <th>Latest Transaction</th> */}
                <th>Price</th>
                {/* <th>Count In Stock</th>
                <th>Sales</th> */}
                <th></th>
              </tr>
            </thead>
            <tbody>
              {mhistorys.map((favourites) => (
                <tr key={favourites._id}>
                  <td>
                    {' '}
                    <img
                      width='50'
                      height='50'
                      alt={favourites.product && favourites.product.goods_name}
                      src={favourites.product && favourites.product.goods_pic}
                    />{' '}
                  </td>
                  <td>{favourites.product && favourites.product.goods_name}</td>
                  <td>${favourites.product && favourites.product.goods_price}</td>
                  <td>
                    <LinkContainer to={`/goods/${favourites.product && favourites.product._id}`}>
                      <Button className='btn-sm' variant='light'>
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
    </>
  )
}

export default HistoryScreen