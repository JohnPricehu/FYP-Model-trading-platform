/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Button, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import ErrorMessage from '../components/ErrorMessage'
import Loading from '../components/Loading'
// import { listOrders, deleteOrder } from '../actions/orderAction'
import { listMyFavourite,deleteFavouriteAction  } from '../actions/favouriteActions'
import {
  addToHistoryAction
} from '../actions/historyAction.js'

const FavouriteScreen = ({ history }) => {
  const dispatch = useDispatch()

  const  myFavourite = useSelector((state) => state.myFavourite)
  const { loading: loadingfavourites, error: errorfavourites, mfavourites } =  myFavourite

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const addHistory = useSelector((state) => state.addHistory);
  const { success: successaddhistory,
    error: erroraddhistory } = addHistory;

  useEffect(() => {
        dispatch(listMyFavourite())
  }, [dispatch, history, userInfo])



  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure ?')) {
      dispatch(deleteFavouriteAction(id))
      history.go(0)
    }
  }

  const addToHistoryHandler = async (id, user) => {
    dispatch(addToHistoryAction(id,user))
  }

  return (
    <>
      <h1 className='mt-5'>My Favourites</h1>
          {loadingfavourites ? (
          <Loading />
        ) : errorfavourites ? (
          <ErrorMessage variant='danger'>{errorfavourites}</ErrorMessage>
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
              {mfavourites.map((favourites) => (
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
                    <LinkContainer to={`/goods/${favourites.product && favourites.product._id}`} onClick={() => addToHistoryHandler(favourites.product && favourites.product._id,userInfo._id)}>
                      <Button className='btn-sm' variant='light'>
                        Details
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(favourites.product && favourites.product._id)}
                    >
                      <i className='fas fa-trash'>Delete</i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
    </>
  )
}

export default FavouriteScreen