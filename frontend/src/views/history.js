/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Button, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import ErrorMessage from '../components/ErrorMessage'
import Loading from '../components/Loading'
import { listMyHistory,addToHistoryAction } from '../actions/historyAction.js'

const HistoryScreen = ({ history }) => {
  const dispatch = useDispatch()

  const  myHistory = useSelector((state) => state.myHistory)
  const { loading: loadinghistory, error: errorhistory, mhistorys } =  myHistory

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const addHistory = useSelector((state) => state.addHistory);
  const { success: successaddhistory,
    error: erroraddhistory } = addHistory;



  useEffect(() => {
        dispatch(listMyHistory())
  }, [dispatch, history, userInfo])

  const addToHistoryHandler = async (id, user) => {
    dispatch(addToHistoryAction(id,user))
  }


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
              {mhistorys.map((historys) => (
                <tr key={historys._id}>
                  <td>
                    {' '}
                    <img
                      width='50'
                      height='50'
                      alt={historys.product && historys.product.goods_name}
                      src={historys.product && historys.product.goods_pic}
                    />{' '}
                  </td>
                  <td>{historys.product && historys.product.goods_name}</td>
                  <td>${historys.product && historys.product.goods_price}</td>
                  <td>
                    <LinkContainer to={`/goods/${historys.product && historys.product._id}`}onClick={() => addToHistoryHandler(historys.product && historys.product._id,userInfo._id)}>
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