import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import { updateProfile} from '../actions/userActions'
import { listMyOrders } from '../actions/orderAction'
import { listMyGoods } from '../actions/goodsActions'

const ProfileScreen = ({ location, history }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState("");
  const [isAdmin, setIsAdmin] = useState();
  const [isMember, setIsMember] = useState();

  // const [password, setPassword] = useState('')
  // const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

  // const userDetails = useSelector((state) => state.userDetails)
  // const { user } = userDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
  const { loading, error, success } = userUpdateProfile

  const orderListMy = useSelector((state) => state.orderListMy)
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy

  const goodsMy = useSelector((state) => state.goodsMy)
  const { loading: loadingGoods, error: errorGoods, mgoods } = goodsMy

  useEffect(() => {
    if (!userInfo) {
      // eslint-disable-next-line no-restricted-globals
      history.push('/login')
    } else {
      // if (!user.name) {
      //   dispatch(getUserDetails('profile'))
      //   dispatch(listMyOrders())
      // } else {
        setName(userInfo.name)
        setEmail(userInfo.email)
        setPhone(userInfo.phone)
        setIsAdmin(userInfo.isAdmin)
        setIsMember(userInfo.isMember)
        dispatch(listMyGoods())
      // }
    }
  }, [history, userInfo, dispatch])

  const submitHandler = (e) => {
    e.preventDefault()
    // if (password !== confirmPassword) {
    //   setMessage('Passwords do not match')
    // } else {
      dispatch(updateProfile({ 
        // id: user._id,
        name, email, phone, isAdmin,isMember
        // password
       }
       ))
    // }
  }

  return (
    <Row className='my-5'>
      <Col md={3}>
        <h2>User Profile</h2>        
        {userInfo && ! userInfo.isMember && <ErrorMessage>You are not a <Link to='/paymember'>member</Link> yet, hurry up and buy to enjoy more power!{' '}</ErrorMessage>}
        {userInfo && userInfo.isMember && <ErrorMessage variant='success'>Dear member, enjoy this system</ErrorMessage>}
        {message && <ErrorMessage variant='danger'>{message}</ErrorMessage>}
        {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
        {success && <ErrorMessage variant='success'>Profile Updated!</ErrorMessage>}
        {loading && <Loading />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='name'
              placeholder='Enter name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='phone'>
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type='phone'
              placeholder='Enter phone'
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type='submit' variant='primary'>
            Update
          </Button>
          {/* <Form.Group controlId='wallet'> */}
            
          {/* </Form.Group> */}
        </Form>
        <h2>wallet: $ {userInfo.wallet}</h2>
      </Col>
      <Col md={9}>
        <h2>My Order</h2>
        {loadingOrders ? (
          <Loading />
        ) : errorOrders ? (
          <ErrorMessage variant='danger'>{errorOrders}</ErrorMessage>
        ) : (
          <Table striped bordered hover responsive className='tabel-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice}</td>
                  <td>
                    {' '}
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}{' '}
                  </td>

                  <td>
                    {' '}
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}{' '}
                  </td>

                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
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
        </Col>
        <Col md={10}>
        <h2>My Models</h2>
          {loadingGoods ? (
          <Loading />
        ) : errorGoods ? (
          <ErrorMessage variant='danger'>{errorGoods}</ErrorMessage>
        ) : (
          <Table striped bordered hover responsive className='tabel-sm'>
            <thead>
              <tr>
                <th>Photo</th>
                <th>Name</th>
                <th>Create Date</th>
                <th>Latest Transaction</th>
                <th>Price</th>
                <th>Count In Stock</th>
                <th>Sales</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {mgoods.map((goods) => (
                <tr key={goods._id}>
                  <td>
                    {' '}
                    <img
                      width='50'
                      height='50'
                      alt={goods.goods_name}
                      src={goods.goods_pic}
                    />{' '}
                  </td>
                  <td>{goods.goods_name}</td>
                  <td>{goods.createdAt.substring(0, 10)}</td>
                  {/* if ({goods.createdAt} == {goods.updatedAt}) {                    
                  <td>{goods.updatedAt.substring(0, 10)}</td>
                  }{  <td></td>} */}
                  <td>{goods.updatedAt.substring(0, 10)}</td>
                  <td>${goods.goods_price}</td>
                  <td>{goods.countInStock}</td>
                  <td>{goods.sales}</td>
                  <td>
                    <LinkContainer to={`/goods/${goods._id}`}>
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
      </Col>
    </Row>
  )
}

export default ProfileScreen
