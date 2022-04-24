/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Button, Table, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import Paginate from '../components/Paginate'
import {
  listGoods,
  deleteGoodsAction,
} from '../actions/goodsActions'
import { GOODS_CREATE_RESET } from '../constants/goodsConstants'
// import { app } from '../base'

const productListScreen = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1
  const dispatch = useDispatch()

  const goodsList = useSelector((state) => state.goodsList)
  const { loading, error, goods, page, pages } = goodsList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const goodDelete = useSelector((state) => state.goodsDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = goodDelete

  // const goodsCreate = useSelector((state) => state.goodsCreate)
  // const {
  //   loading: loadingCreate,
  //   error: errorCreate,
  //   success: successCreate,
  //   good: createdgood,
  // } = goodsCreate

  const listDetails = useSelector((state) => state.goodsDetails)
  const { good } = listDetails

  useEffect(() => {
    dispatch({ type: GOODS_CREATE_RESET })
    if (!userInfo.isAdmin) {
      history.push('/login')
    }

    // if (successCreate) {
    //   history.push(`/admin/good/${createdgood._id}/edit`)
    // } else {
      dispatch(listGoods('', pageNumber))
    // }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    // successCreate,
    // createdgood,
    pageNumber,
  ])

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure ?')) {
      // const storageRef = app
      //   .storage()
      //   .ref()
      //   .child(good.goods_pic)
      //   .name.split('?')
      // const imageName = storageRef[0]
      // await app.storage().ref().child(imageName).delete()
      dispatch(deleteGoodsAction(id))
    }
  }

  // const creategoodHandler = () => {
  //   dispatch(createGoodsAction())
  // }

  return (
    <>
      <Row className='align-items-center mt-5'>
        <Col>
          <h1>Goods</h1>
        </Col>
        {/* <Col className='text-right'>
          <Button className='my-3' onClick={creategoodHandler}>
            <i className='fas fa-plus'></i> Create good
          </Button>
        </Col> */}
      </Row>
      {loadingDelete && <Loading />}
      {errorDelete && <ErrorMessage variant='danger'>{errorDelete}</ErrorMessage>}
      {/* {loadingCreate && <Loading />}
      {errorCreate && <ErrorMessage variant='danger'>{errorCreate}</ErrorMessage>} */}

      {loading ? (
        <Loading />
      ) : error ? (
        <ErrorMessage variant='danger'>{error}</ErrorMessage>
      ) : (
        <>
          <Table striped bordered hover responsive className='tabel-sm'>
            <thead>
              <tr>
                <th>PHOTO</th>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
                {/* <th>BRAND</th> */}
                <th>Count In Stock</th>
                <th>Owner</th>
                <th>Create Time</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {goods.map((good) => (
                <tr key={good._id}>
                  <td>
                    {' '}
                    <img
                      width='50'
                      height='50'
                      alt={good.goods_name}
                      src={good.goods_pic}
                    />{' '}
                  </td>
                  <td>{good.goods_name}</td>
                  <td>${good.goods_price}</td>
                  <td>{good.goods_category}</td>
                  {/* <td>{good.brand}</td> */}
                  <td>{good.countInStock}</td>
                  <td>{good.owner && good.owner.name}</td>
                  <td>{good.createdAt}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${good._id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <i className='fas fa-edit'>Edit</i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(good._id)}
                    >
                      <i className='fas fa-trash'>Delete</i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={pages} page={page} isAdmin={true} />
        </>
      )}
    </>
  )
}

export default productListScreen
