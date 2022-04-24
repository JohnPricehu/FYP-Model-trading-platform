import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Form } from 'react-bootstrap'
import {
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Card,
  FormControl,
} from 'react-bootstrap'
import Rating from '../components/Rating'
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import Meta from '../components/Meta'
import {
  listGoodsDetails,
  createGoodsReview,
} from '../actions/goodsActions'
import {
  addToFavouriteAction
} from '../actions/favouriteActions'
import {
  addToWantedAction
} from '../actions/wantedActions'
import { GOODS_CREATE_REVIEW_RESET } from '../constants/goodsConstants'

const ProductScreen = ({ history, match }) => {
  const [qty, setQty] = useState(1)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const listDetails = useSelector((state) => state.goodsDetails)
  const { loading, good, error } = listDetails

  const addFavourite = useSelector((state) => state.addFavourite);
  const { success: successadd,
    error: erroradd, } = addFavourite;

    const addWanted = useSelector((state) => state.addWanted);
    const { success: successaddwanted,
      error: erroraddwanted, } = addWanted;

  const productReviewCreate = useSelector((state) => state.goodsReviewCreate)
  const {
    success: successProductReview,
    error: errorProductReview,
  } = productReviewCreate


  useEffect(() => {
    if (successProductReview) {
      alert('Review Submitted!')
      setRating(0)
      setComment('')
      dispatch({ type: GOODS_CREATE_REVIEW_RESET })
    }
    if (successadd){
      alert('Add Favourites successfully!')
    }
    // if (successaddwanted){
    //   alert('Add Wanted successfully!')
    // }
    dispatch(listGoodsDetails(match.params.id))
    
  }, [dispatch, match.params.id,  
    successProductReview,
    successadd,
    successaddwanted
  ])

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}/?qty=${qty}`)
  }
  const addToFavouriteHandler = async (id, user) => {
      dispatch(addToFavouriteAction(id,user))
  }

  const addToWantedHandler = async (id, user) => {
    dispatch(addToWantedAction(id,user))
}
  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(createGoodsReview(match.params.id, { rating, comment }))
    // dispatch(addToFavouriteAction(match.params.id))
  }
  // console.log(good.reviews.length);
  return (
    <>
      <Link
        style={{
          backgroundColor: 'rgb(63 57 63)',
          color: 'white',
          border: '2px solid pink',
          borderRadius: '10px',
          marginTop: '50px',
          marginBottom: '10px',
        }}
        className='btn btn-light'
        to='/'
      >
        Go Back
      </Link>
      {loading ? (
        <Loading />
      ) : error ? (
        <ErrorMessage variant='danger'>{error}</ErrorMessage>
      ) : (
        <>
          <Meta title={good.goods_name} />
          <Row>
            <Col md={6}>
              <Image src={good.goods_pic} alt={good.goods_name} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3>{good.goods_name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={good.rating}
                    text={`${good.numReviews} reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>Price: $ {good.goods_price}</ListGroup.Item>
                <ListGroup.Item>
                  Details: {good.goods_details}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>$ {good.goods_price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {good.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {good.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <FormControl
                            as='select'
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {/* this line mean if we have five item in the array it will show like this [0, 1, 2, 3, 4] */}
                            {[...Array(good.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </FormControl>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}
                  
                  <ListGroup.Item>
                      {!userInfo ?(
                    <ErrorMessage>
                      Please <Link to='/login'>login</Link> to buy the goods{' '}
                    </ErrorMessage>
                    ):
                    (good.goods_category === 'special' ? (
                      userInfo && !userInfo.isMember ? (                       
                        <Button
                      className='btn-block'
                      style={{
                        backgroundColor: 'rgb(63 57 63)',
                      }}
                      type='button'
                      disabled={good.countInStock === 0}
                    >
                      Be a prime member
                    </Button>                                                           
                    ):(
                      good.countInStock > 0 ? (
                      <>
                      <Button
                    onClick={addToCartHandler}
                    className='btn-block'
                    style={{
                      backgroundColor: 'rgb(63 57 63)',
                    }}
                    type='button'
                    disabled={good.countInStock === 0}
                  >
                    Add To Cart
                  </Button>
                  <Button
                        onClick={() => addToFavouriteHandler(good._id,userInfo._id)}
                        className='btn-block'
                        style={{
                          backgroundColor: 'rgb(63 57 63)',
                        }}
                        type='button'
                      >
                        Add To Favourite
                      </Button>
                      </>
                      ):
                      (
                        <>
                        <Button
                        onClick={() => addToFavouriteHandler(good._id,userInfo._id)}
                        className='btn-block'
                        style={{
                          backgroundColor: 'rgb(63 57 63)',
                        }}
                        type='button'
                      >
                        Add To Favourite
                      </Button>
                      <Button
                        onClick={() => addToWantedHandler(good._id,userInfo._id)}
                        className='btn-block'
                        style={{
                          backgroundColor: 'rgb(63 57 63)',
                        }}
                        type='button'
                      >
                        Add To Wanted
                      </Button>
                      </>
                      )
                      )):(
                        good.countInStock > 0 ? (
                          <>
                          <Button
                        onClick={addToCartHandler}
                        className='btn-block'
                        style={{
                          backgroundColor: 'rgb(63 57 63)',
                        }}
                        type='button'
                        disabled={good.countInStock === 0}
                      >
                        Add To Cart
                      </Button>
                      <Button
                            onClick={() => addToFavouriteHandler(good._id,userInfo._id)}
                            className='btn-block'
                            style={{
                              backgroundColor: 'rgb(63 57 63)',
                            }}
                            type='button'
                          >
                            Add To Favourite
                          </Button>
                          </>
                          ):
                          (
                            <>
                            <Button
                            onClick={() => addToFavouriteHandler(good._id,userInfo._id)}
                            className='btn-block'
                            style={{
                              backgroundColor: 'rgb(63 57 63)',
                            }}
                            type='button'
                          >
                            Add To Favourite
                          </Button>
                          <Button
                            onClick={() => addToWantedHandler(good._id,userInfo._id)}
                            className='btn-block'
                            style={{
                              backgroundColor: 'rgb(63 57 63)',
                            }}
                            type='button'
                          >
                            Add To Wanted
                          </Button>
                          </>
                      )
                      
                      )
                    )
      
                    }
                  
                  </ListGroup.Item>
                  
                </ListGroup>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <h2>Reviews</h2>
              {good.reviews.length === 0 && <ErrorMessage>No Reviews</ErrorMessage>}
              <ListGroup variant='flush'>
                {good.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h2>Write a Customer Review</h2>
                  {errorProductReview && (
                    <ErrorMessage variant='danger'>{errorProductReview}</ErrorMessage>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId='rating'>
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as='select'
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value=''>Select...</option>
                          <option value='1'>1- Poor</option>
                          <option value='2'>2- Fair</option>
                          <option value='3'>3- Good</option>
                          <option value='4'>4- Very Good</option>
                          <option value='5'>5- Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId='comment'>
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as='textarea'
                          row='3'
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button
                        type='submit'
                        variant='primary'
                        style={{
                          backgroundColor: 'rgb(63 57 63)',
                        }}
                      >
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <ErrorMessage>
                      Please <Link to='/login'>login</Link> to write a review{' '}
                    </ErrorMessage>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  )
}

export default ProductScreen
