import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Form, Card, Button } from 'react-bootstrap'
import ErrorMessage from "../components/ErrorMessage";
import { addToCart, removeFromCart, cleanCart} from '../actions/cartAction'

// location is used to get ?qty= from the url
const CartScreen = ({ match, location, history }) => {
  const productId = match.params.id
  // location.search will give us (?qty=1) . So we check if is there then we split it . split method will return an array like this ['qty', '1']. and we want the second index [1]
  const qty = location.search ? Number(location.search.split('=')[1]) : 1

  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty))
    }
  }, [dispatch, productId, qty])

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }
  const cleanHandler = () => {
    dispatch(cleanCart());
    // history.go("0");
    history.push("/cart");
    history.go("0");
  };
  const checkOutHandler = () => {
    history.push('/shipping')
  }
  return (
    <Row className='my-5'>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <ErrorMessage>
            Your cart is empty <Link to='/'>Go Back</Link>
          </ErrorMessage>
        ) : (
          <ListGroup variant='flush'>
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>${item.price}</Col>
                  <Col md={2}>
                    <Form.Control
                      as='select'
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      type='button'
                      variant='light'
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      <i className='fas fa-trash'>Delete</i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            {userInfo && userInfo.isMember ? (
            <ListGroup.Item>
            
              <h2>
                Subtotal ( {cartItems.reduce((acc, item) => acc + item.qty, 0)})
                items
              </h2>
              ${cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)} * 80% =  ${cartItems
                  .reduce((acc, item) => acc + item.qty * item.price * 0.8, 0)
                  .toFixed(2)}
            </ListGroup.Item>
            ):(
              <ListGroup.Item>
            
              <h2>
                Subtotal ( {cartItems.reduce((acc, item) => acc + item.qty, 0)})
                items
              </h2>
              $
              {cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}
            </ListGroup.Item>
            )}
            <ListGroup.Item>
              <Button
                type='button'
                className='btn-block'
                style={{
                  backgroundColor: 'red',
                  border: '1px solid #B375B0 ',
                  borderRadius: '20px',
                }}
                disabled={cartItems.length === 0}
                onClick={cleanHandler}
                
              >
                Clean Your Cart
              </Button>
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type='button'
                className='btn-block'
                style={{
                  backgroundColor: 'rgb(63 57 63)',
                  border: '1px solid #B375B0 ',
                  borderRadius: '20px',
                }}
                disabled={cartItems.length === 0}
                onClick={checkOutHandler}
                
              >
                Procced To Check Out
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  )
}

export default CartScreen
