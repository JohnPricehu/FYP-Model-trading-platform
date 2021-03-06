import React, { useEffect, useState } from 'react'
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import { Link } from 'react-router-dom'
import { getOrderDetails, deliverOrder,payOrder } from '../actions/orderAction'
import { cleanCart} from '../actions/cartAction'

const OrderScreen = ({ match, history }) => {
  const orderId = match.params.id
  const dispatch = useDispatch()
  const [failpmessage, setFailpMessage] = useState(null)

  const orderDetails = useSelector((state) => state.orderDetails)
  const { order, loading, error } = orderDetails

  const orderDeliver = useSelector((state) => state.orderDeliver)
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver

  const orderPay = useSelector((state) => state.orderPay)
  const { loading: loadingPay, success: successPay, error:errorPay } = orderPay

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  if (!loading) {
    // Calculate prices
    const addDcimal = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2)
    }
    order.itemsPrice = addDcimal(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    )
  }

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    }
    if(errorPay){
      history.go(0)
      setFailpMessage('Payment Failed! Check your wallet!')
      // alert('Payment Failed! Check your wallet!')
    }
    dispatch(getOrderDetails(orderId))
  }, [dispatch, orderId, errorPay, history, userInfo])

  const deliverHandler = () => {
    dispatch(deliverOrder(order))
    history.go(0)
  }
  const payHandler = () => {
    dispatch(payOrder(order))
    history.go(0)
    dispatch(cleanCart())
  }
  return loading ? (
    <Loading  />
  ) : error ? (
    <ErrorMessage variant='danger'>{error}</ErrorMessage>
  ) : (
    <>
      <h1 className='mt-5'>Order{order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                {' '}
                <strong>Name: </strong> {order.user.name}{' '}
              </p>
              <p>
                {' '}
                <strong>Email: </strong>{' '}
                <a href={`mailto: ${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Address:</strong>
                {order.shippingAddress.address}, {order.shippingAddress.city},{' '}
                {order.shippingAddress.postalCode},{' '}
                {order.shippingAddress.address}, {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <ErrorMessage variant='success'>
                  Delivered on {order.deliveredAt}
                </ErrorMessage>
              ) : (
                <ErrorMessage variant='danger'>Not Delivered</ErrorMessage>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <ErrorMessage variant='success'>Paid on {order.paidAt}</ErrorMessage>
              ) : (
                <ErrorMessage variant='danger'>Not Paid</ErrorMessage>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <ErrorMessage>Order Is Empty</ErrorMessage>
              ) : (
                <ListGroup variant='flush'>
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x {item.price} = ${item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  {<Col>${order.taxPrice}</Col>}
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
              {loadingPay && <Loading />}
                {userInfo && !userInfo.isAdmin && !order.isPaid && (
                  <ListGroup.Item>
                    <Button
                      type='button'
                      className='btn btn-block'
                      onClick={payHandler}
                    >
                      Pay Order
                    </Button>
                                        
                  </ListGroup.Item>
                )}
                {userInfo && userInfo.isAdmin && !order.isPaid && (
                  <ListGroup.Item>
                    <Button
                      type='button'
                      className='btn btn-block'
                      onClick={payHandler}
                    >
                      Mark As Paid
                    </Button>
                                        
                  </ListGroup.Item>
                )}
                {loadingDeliver && <Loading />}
                {order.isPaid && !order.isDelivered && (
                  
                  <ListGroup.Item>
                <Button
                      type='button'
                      className='btn btn-block'
                      onClick={deliverHandler}
                    >
                      Mark As Delivered
                    </Button>
                    </ListGroup.Item>
                    )}
              </ListGroup.Item>
              {failpmessage && <ErrorMessage variant='danger'>{failpmessage}</ErrorMessage>}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default OrderScreen
