/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Button, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import ErrorMessage from '../components/ErrorMessage'
import Loading from '../components/Loading'
import { listOrders, deleteOrder } from '../actions/orderAction'

const OrderListScreen = ({ history }) => {
  const dispatch = useDispatch()

  const orderList = useSelector((state) => state.orderList)
  const { loading, error, orders } = orderList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const delettOrder = useSelector((state) => state.delettOrder)
  const {
    loading: orderLoading,
    error: orderError,
    success: orderSuccess,
  } = delettOrder

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders())
    } else {
      history.push('/login')
    }
  }, [dispatch, history, userInfo, orderSuccess])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteOrder(id))
    }
  }

  return (
    <>
      <h1 className='mt-5'>Orders List</h1>
      {orderLoading && <Loading />}
      {orderError && <ErrorMessage variant='danger'>{orderError}</ErrorMessage>}
      {loading ? (
        <Loading />
      ) : error ? (
        <ErrorMessage variant='danger'>{error}</ErrorMessage>
      ) : (
        <Table striped bordered hover responsive className='tabel-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERD</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>
                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => deleteHandler(order._id)}
                  >
                    <i className='fas fa-trash'>{order._id}</i>
                  </Button>
                </td>
                <td>{order.user && order.user.name}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>${order.totalPrice}</td>
                <td>
                  {order.isPaid ? (
                    order.paidAt
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}>No</i>
                  )}
                </td>

                <td>
                  {order.isDelivered ? (
                    order.deliveredAt
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}>No</i>
                  )}
                </td>

                <td>
                  <LinkContainer to={`/order/${order._id}`}>
                    <Button variant='light' className='btn-sm'>
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

export default OrderListScreen
