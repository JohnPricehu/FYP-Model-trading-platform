/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Button, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import ErrorMessage from '../components/ErrorMessage'
import Loading from '../components/Loading'
import { listMyWanted,deleteWantedAction  } from '../actions/wantedActions'
import {
  addToHistoryAction
} from '../actions/historyAction.js'


const WantedScreen = ({ history }) => {
  const dispatch = useDispatch()

  const  myWanted= useSelector((state) => state.myWanted)
  const { loading: loadingwanteds, error: errorwanteds, mwanteds } =  myWanted

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  // const addHistory = useSelector((state) => state.addHistory);
  // const { success: successaddhistory,
  //   error: erroraddhistory } = addHistory;



  useEffect(() => {
        dispatch(listMyWanted())
  }, [dispatch, history, userInfo])


  const deleteWantedHandler = async (id) => {
    if (window.confirm('Are you sure ?')) {
      dispatch(deleteWantedAction(id))
      history.go(0)
    }
  }

  const addToHistoryHandler = async (id, user) => {
    dispatch(addToHistoryAction(id,user))
  }

  return (
    <>
      <h1 className='mt-5'>My Wanted</h1>
          {loadingwanteds ? (
          <Loading />
        ) : errorwanteds ? (
          <ErrorMessage variant='danger'>{errorwanteds}</ErrorMessage>
        ) : (
          <Table striped bordered hover responsive className='tabel-sm'>
            <thead>
              <tr>
                <th>Photo</th>
                <th>Name</th>
                <th>Price</th>
                <th>Count In Stock</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {mwanteds.map((wanted) => (
                  
                <tr key={wanted._id}>
                  <td>
                    {' '}
                    <img
                      width='50'
                      height='50'
                      alt={wanted.product && wanted.product.goods_name}
                      src={wanted.product && wanted.product.goods_pic}
                    />{' '}
                  </td>
                  <td>{wanted.product && wanted.product.goods_name}</td>
                  <td>${wanted.product && wanted.product.goods_price}</td>
                  <td>
                  {wanted.product && wanted.product.countInStock <= 0 ? (
                    <i className='fas fa-times' style={{ color: 'red' }}>No count</i>
                  ) : (
                    <i className='fas fa-times' style={{ color: 'green' }}>{wanted.product && wanted.product.countInStock}</i>
                  )}
                    
                    </td>
                  <td>
                    <LinkContainer to={`/goods/${wanted.product && wanted.product._id}`} onClick={() => addToHistoryHandler(wanted.product && wanted.product._id,userInfo._id)}>
                      <Button className='btn-sm' variant='light'>
                        Details
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteWantedHandler(wanted.product && wanted.product._id)}
                    >
                      <i className='fas fa-trash'>Delete</i>
                    </Button>
                  </td>
                </tr>           
              ))         
              }
            </tbody>
          </Table>
        )}
    </>
  )
}

export default WantedScreen