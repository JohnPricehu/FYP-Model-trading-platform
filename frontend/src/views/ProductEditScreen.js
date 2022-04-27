import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import FormContainer from '../components/FormContainer'
import { listGoodsDetails, updateGoods } from '../actions/goodsActions'
import { GOODS_UPDATE_RESET } from '../constants/goodsConstants'
// import { app } from '../base'

const ProductEditScreen = ({ match, history }) => {
  const productId = match.params.id
  const [goods_name, setName] = useState('')
  const [goods_price, setPrice] = useState(0)
  // const [image, setImage] = useState('')
  // const [brand, setBrand] = useState('')
  const [goods_category, setCategory] = useState('')
  const [countInStock, setCountInStock] = useState(0)
  const [goods_details, setDescription] = useState('')
  const [picMessage, setPicMessage] = useState(null);
  const [goods_pic, setGoods_pic] = useState("");
  // const [imageURL, setImageURL] = useState('')

  const dispatch = useDispatch()

  const goodsDetails = useSelector((state) => state.goodsDetails)
  const { loading, error, good } = goodsDetails

  const goodsUpdate = useSelector((state) => state.goodsUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = goodsUpdate

  const postDetails = (pics) => {
    if (
      pics ===
      "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
    ) {
      return setPicMessage("Please Select an Image");
    }
    setPicMessage(null);
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "goods_pic");
      data.append("cloud_name", "fyp2022");
      fetch("https://api.cloudinary.com/v1_1/fyp2022/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setGoods_pic(data.url.toString());
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return setPicMessage("Please Select an Image");
    }
  };

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: GOODS_UPDATE_RESET })
      history.push('/admin/productlist')
    } else {
      if (!good.goods_name || good._id !== productId) {
        dispatch(listGoodsDetails(productId))
      } else {
        setName(good.goods_name)
        setPrice(good.goods_price)
        setGoods_pic(good.goods_pic)
        setCategory(good.goods_category)
        setCountInStock(good.countInStock)
        setDescription(good.goods_details)
      }
    }
  }, [dispatch, history, good, productId, successUpdate])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      updateGoods({
        _id: productId,
        goods_name,
        goods_price,
        goods_pic,
        goods_category,
        goods_details,
        countInStock,
      })
    )
  }

  return (
    <>
      <Link to='/admin/productlist' className='btn btn-light my-3'>
        Go Back
      </Link>

      <FormContainer>
        <h1>Edit Model</h1>
        {loadingUpdate && <Loading />}
        {errorUpdate && <ErrorMessage variant='danger'>{errorUpdate}</ErrorMessage>}

        {loading ? (
          <Loading />
        ) : error ? (
          <ErrorMessage variant='danger'>{error}</ErrorMessage>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={goods_name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='price'>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter price'
                value={goods_price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='image'>
              <Form.Label>Image</Form.Label>
              {goods_pic === 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg' ? (
                <input 
                type='file' 
                accept="image/*"
                onChange={(e) => postDetails(e.target.files[0])} />
              ) : (
                <p>Image Selected !!!!</p>
              )}
              {goods_pic === 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg' ? (
                <p>no image</p>
              ) : (
                <img height='100' width='100' src={goods_pic} alt={goods_name} />
              )}
            </Form.Group>

            <Form.Group controlId='countInStock'>
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter countInStock'
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='category'>
              <Form.Label>Category</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter category'
                value={goods_category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='description'>
              <Form.Label>Details</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Details '
                value={goods_details}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default ProductEditScreen
